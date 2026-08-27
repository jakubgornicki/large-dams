#!/usr/bin/env python3
"""
Build the slim map dataset for "Past the Expiration Date".

Input : build/GDW_barriers_v1_0.txt  (Global Dam Watch v1.0 barrier attribute table)
Output: web/data/dams.json           (all European large dams, slim fields)
        web/data/stats.json          (pre-computed aggregates for counters/charts)

Design decisions:
  - GDW is the authoritative base layer for European large dams (year, height, capacity, use).
  - We keep EVERY European dam, including those with no construction year (age=null),
    so framing choices happen in the UI, not the data.
  - "over_10" = reservoir capacity >= 10 million m3 -> EIA Directive Annex I threshold.
  - "alert age" = 50 years (UNU-INWEH). age computed against REF_YEAR.
"""
import csv, json, os

REF_YEAR = 2026  # report publication year; "age" is measured against this

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "GDW_barriers_v1_0.txt")
OUT_DIR = os.path.join(HERE, "..", "web", "data")

EUR = {
    'ALBANIA','ANDORRA','AUSTRIA','BELARUS','BELGIUM','BOSNIA AND HERZEGOVINA','BULGARIA',
    'CROATIA','CYPRUS','CZECHIA','CZECH REPUBLIC','DENMARK','ESTONIA','FINLAND','FRANCE',
    'GERMANY','GREECE','HUNGARY','ICELAND','IRELAND','ITALY','KOSOVO','LATVIA','LIECHTENSTEIN',
    'LITHUANIA','LUXEMBOURG','MALTA','MOLDOVA','MONTENEGRO','NETHERLANDS','NORTH MACEDONIA',
    'MACEDONIA','NORWAY','POLAND','PORTUGAL','ROMANIA','SERBIA','SLOVAKIA','SLOVENIA','SPAIN',
    'SWEDEN','SWITZERLAND','UKRAINE','UNITED KINGDOM',
}

# ISO-ish tidy names for display
CNTRY_FIX = {'CZECH REPUBLIC': 'Czechia', 'MACEDONIA': 'North Macedonia'}

def num(s):
    try:
        v = float(s)
        return v
    except (ValueError, TypeError):
        return None


def coord(row, dam_key, riv_key):
    """Prefer the dam location; fall back to the river/reservoir point."""
    lo = num(row.get(dam_key)); la = num(row.get('LAT_DAM'))
    if lo is not None and la is not None and (lo != 0 or la != 0):
        return lo, la
    lo = num(row.get(riv_key)); la = num(row.get('LAT_RIV'))
    if lo is not None and la is not None:
        return lo, la
    return None, None


def main():
    feats = []
    with open(SRC, newline='', encoding='utf-8', errors='replace') as f:
        for row in csv.DictReader(f):
            country = row['COUNTRY'].strip().upper()
            if country not in EUR:
                continue
            lon, lat = coord(row, 'LONG_DAM', 'LONG_RIV')
            if lon is None:
                continue
            y = num(row['YEAR_DAM'])
            year = int(y) if (y and y > 1000) else None
            cap = num(row['CAP_MCM'])
            cap = cap if (cap and cap > 0) else None
            hgt = num(row['DAM_HGT_M'])
            hgt = hgt if (hgt and hgt > 0) else None
            age = (REF_YEAR - year) if year else None
            over10 = (cap is not None and cap >= 10)

            name = (row['DAM_NAME'].strip() or row['RES_NAME'].strip() or 'Unnamed')
            river = row['RIVER'].strip()
            disp_country = CNTRY_FIX.get(country, country.title())

            feats.append({
                "id": int(row['GDW_ID']),
                "lon": round(lon, 5),
                "lat": round(lat, 5),
                "name": name,
                "river": river if river and river.upper() != 'NONAME' else None,
                "country": disp_country,
                "year": year,
                "age": age,
                "height_m": round(hgt, 1) if hgt else None,
                "cap_mcm": round(cap, 1) if cap else None,
                "over10": over10,
                "use": (row['MAIN_USE'].strip() or None),
            })

    feats.sort(key=lambda d: (d['cap_mcm'] or 0), reverse=True)

    # ---- aggregates ----
    dated = [d for d in feats if d['year']]
    over = [d for d in feats if d['over10']]
    over_dated = [d for d in over if d['year']]

    def bucket(age):
        if age is None: return 'unknown'
        if age < 25: return 'lt25'
        if age < 50: return '25_50'
        if age < 75: return '50_75'
        return 'gt75'

    from collections import Counter
    age_buckets = Counter(bucket(d['age']) for d in feats)
    decade_all = Counter((d['year'] // 10) * 10 for d in dated)
    decade_over = Counter((d['year'] // 10) * 10 for d in over_dated)
    by_country = Counter(d['country'] for d in feats)
    over_by_country = Counter(d['country'] for d in over)

    stats = {
        "ref_year": REF_YEAR,
        "alert_age": 50,
        "total_dams": len(feats),
        "dated_dams": len(dated),
        "over10_dams": len(over),
        "over10_dated": len(over_dated),
        "past_alert_all_dated": sum(1 for d in dated if d['age'] >= 50),
        "past_alert_over10": sum(1 for d in over_dated if d['age'] >= 50),
        "age_buckets": dict(age_buckets),
        "decade_all": {str(k): v for k, v in sorted(decade_all.items())},
        "decade_over10": {str(k): v for k, v in sorted(decade_over.items())},
        "by_country": dict(by_country.most_common()),
        "over10_by_country": dict(over_by_country.most_common()),
    }

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, "dams.json"), "w", encoding='utf-8') as f:
        json.dump(feats, f, ensure_ascii=False, separators=(',', ':'))
    with open(os.path.join(OUT_DIR, "stats.json"), "w", encoding='utf-8') as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)

    print(f"dams.json  : {len(feats)} dams  ({len(dated)} dated, {len(over)} over-10Mm3)")
    print(f"past alert : {stats['past_alert_over10']} over-10 dated dams >= 50 yrs "
          f"({stats['past_alert_all_dated']} of all dated dams)")
    sz = os.path.getsize(os.path.join(OUT_DIR, 'dams.json')) / 1e6
    print(f"dams.json size: {sz:.2f} MB")


if __name__ == "__main__":
    main()
