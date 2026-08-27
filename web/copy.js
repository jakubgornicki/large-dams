/* Bilingual copy for "Past the Expiration Date".
   EN and PL incorporate ClientEarth's July 2026 editorial review.
   {n} placeholders are filled from stats.json at render time. */
window.COPY = {
  en: {
    brand: "Past the Expiration Date",
    hero_headline: "European dams with a recorded construction year and a reservoir capacity of at least 10 million m³ are now past the 50-year alert age.",
    hero_alert_context: "The UN identifies 50 years as an alert age for large dams, associated with three interconnected challenges: increased failure risks, growing maintenance needs and declining functionality due to sedimentation.",
    hero_data_note: "Data note: Global Dam Watch v1.0. Location, construction year and capacity data are incomplete and may contain errors.",
    scrollcue: "Each dot is a large dam · scroll to explore ↓",

    s2_eyebrow: "How we got here",
    s2_title: "Europe built its dams in one great wave.",
    s2_body: "Most of Europe's large dams were built between the 1950s and the 1970s. Colour the map by decade of construction and the pattern is unmistakable: most of the continent's large dams date from the same period. This construction boom is now more than half a century behind us. Yet large dams continue to operate as if nothing has changed.",
    chart_past: "Past the 50-yr alert age",
    chart_notyet: "Not yet",
    s2_cap: "Large European dams by decade of construction. Based on the {dated} dams with a documented year of construction in the Global Dam Watch database.",

    s3_eyebrow: "The alert age",
    s3_title: "What is the alert age?",
    s3_body: "The UN identifies 50 years as the alert age for large dams, associating it with three interconnected challenges: increased failure risks, growing maintenance needs, and declining functionality due to sedimentation.",
    s3_callout: "European dams with a recorded construction year and a reservoir capacity of at least 10 million m³ are now past the 50-year alert age.",

    s4_eyebrow: "The loophole",
    s4_title: "Decades of operation without environmental scrutiny",
    s4_body_intro: "EU law requires an Environmental Impact Assessment before new large dams are built. Yet many existing dams were built before EIA requirements applied and have never undergone a comprehensive environmental assessment.",
    s4_body: "What happens when a 50-year-old dam's operation is extended for years or even decades? Our analysis of Poland, Italy, Bulgaria and Romania found that decisions allowing existing dams to continue operating generally do not trigger a new environmental assessment or public participation in the permitting process. As a result, ageing infrastructure can continue operating under environmental assumptions made long ago.",

    s5_eyebrow: "What ageing dams cost Europe's rivers",
    s5_heading: "The impacts grow with every additional year of operation.",
    s5_title: "",
    s5_lead: "Dam ageing is not a theoretical issue. Each additional year of operation compounds pressures already facing Europe's rivers: fragmented habitats, disrupted sediment transport, declining freshwater fish populations and rising water temperatures.",

    s6_eyebrow: "What now",
    s6_title: "",
    s6_target_prefix: "",
    s6_target_value: "25,000 km",
    s6_target_sub: " of free-flowing rivers to be restored by 2030 under the EU Nature Restoration Regulation.",
    s6_body: "The EU Nature Restoration Regulation sets an objective to restore river connectivity. To achieve this, Member States must identify artificial barriers and prioritise the removal of obsolete barriers that no longer serve a purpose.",
    s6_rec: "<b>The report's core recommendation:</b> before a large dam is allowed to continue operating for decades, the decision should be preceded by an Environmental Impact Assessment. This would allow the impacts of ageing infrastructure on rivers, climate and local communities to be assessed and ensure public participation in decisions about the future of Europe's waters.",
    s6_link_brief: "Read the full briefing →",
    s6_link_method: "Methodology & sources",

    threshold_legend: "Recorded reservoir capacity",
    threshold_yes: "≥ 10M m³",
    threshold_unknown: "< 10M m³ / unknown",
    popup_capacity_over: "Recorded capacity is at least 10M m³. This is the capacity filter used by the map; it does not establish the legal EIA status of an individual dam.",
    popup_capacity_under: "Recorded capacity is below 10M m³ or unknown.",

    footnote: "Large-dam locations, construction year, height and recorded capacity: Global Dam Watch v1.0 (integrating GRanD/GOODD/FHReD). Case-country counts (Poland, Italy, Bulgaria, Romania): ICOLD figures cited in the ClientEarth report. Barrier density: AMBER Atlas. Construction year is recorded for about 35% of European dams, so every age figure is a floor over dated dams. Source coverage is incomplete and individual records may be inaccurate; the map is provided for information and does not guarantee completeness or accuracy. See the <a href=\"methodology.html?lang=en\">methodology note</a>.",
  },

  pl: {
    brand: "Zapory po terminie",
    hero_headline: "europejskie zapory, dla których dostępne są dane o roku budowy, a pojemność zbiornika wynosi co najmniej 10 mln m³, ma już ponad 50 lat.",
    hero_alert_context: "ONZ uznaje 50 lat za próg alarmowy dla wielkich zapór. Po jego przekroczeniu rośnie ryzyko awarii, zwiększają się potrzeby i koszty remontów, a funkcjonalność obiektów spada z powodu zamulania zbiorników.",
    hero_data_note: "Uwaga metodologiczna: dane pochodzą z bazy Global Dam Watch v1.0. Informacje o lokalizacji, roku budowy zapór i pojemności zbiorników są niepełne i mogą zawierać błędy.",
    scrollcue: "Każda kropka to duża zapora · przewiń, aby poznać historię ↓",

    s2_eyebrow: "Jak do tego doszło",
    s2_title: "Europejskie zapory starzeją się w tym samym czasie",
    s2_body: "Większość dużych zapór w Europie powstała w latach 50., 60. i 70. XX wieku. Widać to wyraźnie na mapie i diagramie pokazujących dekady ich budowy. Boom inwestycyjny sprzed ponad pół wieku sprawił, że wiele tych obiektów osiąga dziś podobny wiek i mierzy się z podobnymi wyzwaniami.",
    chart_past: "Po przekroczeniu progu alarmowego 50 lat",
    chart_notyet: "Jeszcze nie",
    s2_cap: "Duże zapory w Europie według dekady budowy. Dane obejmują {dated} zapór z udokumentowanym rokiem budowy w bazie Global Dam Watch.",

    s3_eyebrow: "Próg alarmowy",
    s3_title: "Czym jest próg alarmowy?",
    s3_body: "ONZ uznaje 50 lat za próg alarmowy dla wielkich zapór. Po jego przekroczeniu rośnie ryzyko awarii, zwiększają się potrzeby remontowe i koszty utrzymania, a funkcjonalność obiektów spada wskutek zamulania zbiorników.",
    s3_callout: "europejskie zapory, dla których dostępne są dane o roku budowy, a pojemność zbiornika wynosi co najmniej 10 mln m³, ma już ponad 50 lat.",

    s4_eyebrow: "Luka prawna",
    s4_title: "Dekady eksploatacji bez pełnej oceny środowiskowej",
    s4_body_intro: "Prawo unijne wymaga przeprowadzenia oceny oddziaływania na środowisko przed budową nowej wielkiej zapory. Wiele istniejących obiektów powstało jednak jeszcze przed wprowadzeniem tych przepisów i nigdy nie przeszło kompleksowej oceny środowiskowej.",
    s4_body: "Co dzieje się, gdy eksploatację 50-letniej zapory przedłuża się o kolejne lata, a nawet dekady? Nasza analiza Polski, Włoch, Bułgarii i Rumunii pokazuje, że decyzje pozwalające takim obiektom nadal funkcjonować zwykle nie wymagają nowej oceny oddziaływania na środowisko ani udziału społeczeństwa w procesie wydawania pozwoleń. W efekcie starzejąca się infrastruktura może działać na podstawie założeń środowiskowych sprzed wielu lat.",

    s5_eyebrow: "Koszt starzejących się zapór",
    s5_heading: "Koszt starzejących się zapór dla europejskich rzek",
    s5_title: "Oddziaływanie rośnie z każdym kolejnym rokiem eksploatacji.",
    s5_lead: "Starzenie się zapór nie jest problemem czysto teoretycznym. Każdy dodatkowy rok ich eksploatacji potęguje problemy, z którymi już mierzą się europejskie rzeki: fragmentację siedlisk, zaburzenia transportu osadów, spadek populacji ryb słodkowodnych oraz wzrost temperatury wód.",

    s6_eyebrow: "Co dalej",
    s6_title: "Co dalej",
    s6_target_prefix: "Do 2030 r. UE chce przywrócić swobodny przepływ na co najmniej ",
    s6_target_value: "25 000 km",
    s6_target_sub: " rzek.",
    s6_body: "Unijne rozporządzenie o odbudowie zasobów przyrodniczych zakłada przywracanie ciągłości rzek. W tym celu państwa członkowskie mają wskazać sztuczne bariery na ciekach wodnych i w pierwszej kolejności usuwać te, które są przestarzałe i nie spełniają już swojej funkcji.",
    s6_rec: "<b>Najważniejsza rekomendacja raportu:</b> zanim wielka zapora otrzyma zgodę na dalszą eksploatację przez kolejne dekady, decyzję tę powinna poprzedzać ocena oddziaływania na środowisko. Pozwoliłaby ona ocenić wpływ starzejącej się infrastruktury na rzeki, klimat i lokalne społeczności, a także zapewnić udział społeczeństwa w podejmowaniu decyzji dotyczących przyszłości europejskich wód.",
    s6_link_brief: "Przeczytaj pełny raport →",
    s6_link_method: "Metodologia i źródła",

    threshold_legend: "Pojemność zbiornika",
    threshold_yes: "≥ 10 mln m³",
    threshold_unknown: "< 10 mln m³ / brak danych",
    popup_capacity_over: "Zapisana pojemność wynosi co najmniej 10 mln m³. Jest to filtr pojemności używany przez mapę; nie przesądza on o statusie prawnym OOŚ konkretnej zapory.",
    popup_capacity_under: "Zapisana pojemność jest mniejsza niż 10 mln m³ albo brak danych.",

    footnote: "Lokalizacje dużych zapór, rok budowy, wysokość i zapisana pojemność: Global Dam Watch v1.0 (integruje GRanD/GOODD/FHReD). Dane krajowe (Polska, Włochy, Bułgaria, Rumunia): dane ICOLD cytowane w raporcie ClientEarth. Gęstość barier: AMBER Atlas. Rok budowy jest znany dla około 35% europejskich zapór, więc każda wartość wieku jest dolną granicą dla zapór z datą. Zakres źródeł jest niepełny, a poszczególne rekordy mogą być niedokładne; mapa ma charakter informacyjny i nie gwarantuje kompletności ani poprawności danych. Zob. <a href=\"methodology.html?lang=pl\">notę metodologiczną</a>.",
  },
};

/* Payload stat tiles — built from stats.json (values) + these labels. */
window.TILES = {
  en: [
    { v: "1.2 million", red: false, l: "barriers now block Europe's rivers." },
    { v: "0.7", red: false, l: "barriers per kilometre of river, on average." },
    { v: "~93%", red: true, l: "decline in populations of migratory fish, such as salmon and eel, since 1970." },
    { v: "~1bn m³", red: false, l: "of sediment trapped each year in EU reservoirs — a volume equivalent to roughly 385 Great Pyramids of Giza." },
    { v: "0.8 Gt", red: false, l: "CO₂-equivalent emissions from reservoir surfaces each year, comparable to emissions from Europe's transport sector." },
    { v: "13–19%", red: true, l: "of global reservoir storage capacity has already been lost to sediment accumulation; a further 10% could be lost by 2050." },
  ],
  pl: [
    { v: "1,2 mln", red: false, l: "barier przegradza dziś europejskie rzeki." },
    { v: "0,7", red: false, l: "bariery na każdy kilometr rzeki (średnio)." },
    { v: "~93%", red: true, l: "spadek liczebności populacji ryb wędrownych, takich jak łosoś i węgorz, od 1970 r." },
    { v: "~1 mld m³", red: false, l: "osadów dennych zatrzymywanych rocznie w zbiornikach zaporowych w UE - objętość odpowiadająca ok. 385 Wielkim Piramidom w Gizie." },
    { v: "0,8 Gt", red: false, l: "emisji ekwiwalentu CO₂ z powierzchni zbiorników rocznie - wartość porównywalna z emisjami europejskiego sektora transportu." },
    { v: "13–19%", red: true, l: "globalnej pojemności zbiorników już utracono wskutek gromadzenia się osadów; do 2050 r. spodziewana jest utrata kolejnych 10%." },
  ],
};

/* Country stepper cards — figures cited in the public report. */
window.COUNTRIES = {
  en: {
    Poland:   { name: "Poland", over: "46", of: "large dams", note: "Construction of all 46 dams with a capacity of more than 10 million m³ began before Poland joined the European Union in 2004, and more than half have been in operation for over 50 years." },
    Italy:    { name: "Italy", over: "184", of: "large dams", note: "Most large dams were built before the EIA Directive was implemented in Italy in 1988. The average age of Italian dams is 65 years." },
    Bulgaria: { name: "Bulgaria", over: "76", of: "large dams", note: "Most large dams were built before the EIA Directive was transposed into Bulgarian law in 2002." },
    Romania:  { name: "Romania", over: "100+", of: "large dams", note: "Almost all of them have never been subjected to an Environmental Impact Assessment.", note2: "In addition, a 2023 audit found that 809 dams had never undergone a safety assessment and 221 had expired safety permits." },
  },
  pl: {
    Poland:   { name: "Polska", over: "46", of: "wielkich zapór", note: "Budowę wszystkich 46 zapór tworzących zbiornik o pojemności ponad 10 mln m³ rozpoczęto przed przystąpieniem Polski do Unii Europejskiej w 2004 r., a ponad połowa z nich działa od ponad 50 lat." },
    Italy:    { name: "Włochy", over: "184", of: "wielkie zapory", note: "Większość dużych zapór we Włoszech powstała jeszcze przed wprowadzeniem w 1988 r. obowiązku oceny oddziaływania na środowisko. Średni wiek tych obiektów wynosi 65 lat." },
    Bulgaria: { name: "Bułgaria", over: "76", of: "wielkich zapór", note: "Większość dużych zapór zbudowano przed transpozycją dyrektywy w sprawie oceny oddziaływania na środowisko do prawa bułgarskiego w 2002 r." },
    Romania:  { name: "Rumunia", over: "100+", of: "wielkich zapór", note: "Niemal żadna z nich nigdy nie została poddana ocenie oddziaływania na środowisko.", note2: "Ponadto audyt z 2023 r. wykazał, że 809 zapór nigdy nie przeszło oceny bezpieczeństwa, a 221 miało wygasłe pozwolenia dotyczące bezpieczeństwa." },
  },
};
