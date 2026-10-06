# Rutes Planenques

PWA gamificada de senderisme pel territori (medalles digitals, rànquing i la
gimcana "Ruta dels Capons"). Tot l'app viu a `index.html` (estàtic, Firebase
Hosting via GitHub Actions en fer push a `main`).

## Idees futures / backlog (no urgent)

- **Eina de seguiment GPX desbloquejable com a premi**: a partir d'un llindar
  de punts, l'usuari desbloqueja de manera permanent un "mode seguiment"
  dins l'app (reaprofitant el radar/brúixola i la detecció de desviació del
  track que ja existeix per a la gimcana dels Capons — `distanciaAlTrajecte`,
  `GIMCANA_TRAJECTE_GPX`) per a totes les rutes, presents i futures. Pensat
  com a motivació real (soluciona que gent s'hagi perdut a Pinya Seka i el
  Barretet), exclusiu de l'app (no exportable/compartible), i que manté
  sentit perquè la intenció és seguir afegint rutes noves amb el temps (no
  "caduca" en completar-ho tot). Caldria aconseguir el GPX de Moro, Pinya
  Seka, Barretet i Cogulló (ja es té el de la gimcana). Decidit a mitges,
  sense pressa — retomar quan es vulgui.

- **Ruta 5 (idea): mitja marató de muntanya pels tres castells** (nom
  provisional "Castle Race" o similar, a concretar). Comença i acaba a
  Fontscaldetes (poble abandonat), baixa fins al Torrent de Rupit (indret
  poc conegut) i d'allà enllaça els tres castells: Selmella, Saburella i
  Vallespinosa (aquest últim al bonic poble homònim). Funcionament IDÈNTIC
  a la resta de rutes de l'app (autoguiada, QR al punt, insígnia digital,
  track de Wikiloc) — no és una cursa organitzada amb inscripcions ni
  cronometratge. La diferència és el públic objectiu: pel seu recorregut/
  llargada és apta també per a corredors de muntanya i caminadors de
  marxes de resistència, no només excursionisme tranquil com la resta.
  Detall pendent de decidir: hi ha un tram d'1-2 km de pista rural
  asfaltada (dins d'un entorn bonic, no carretera amb trànsit) — valorat
  com a acceptable per no ser llarg ni perillós, però queda per decidir
  si es busca variant per corriol o simplement s'assumeix i es descriu
  tal qual a la ruta.
  Idea afegida: cronòmetre personal dins l'app per aquesta ruta (inici en
  escanejar el primer QR o botó "Comença", final en escanejar l'últim/
  tornar a Fontscaldetes, temps desat a Firestore amb rànquing de millors
  temps d'aquesta ruta). Deixar clar que és un temps personal auto-
  cronometrat pel mòbil, no un cronometratge oficial de cursa.
  ⚠️ Pendent de verificar: no està confirmat que els tres castells siguin
  tots d'època de la Reconquesta — Vallespinosa i Selmella sí que hi
  encaixen (segles XI-XII, repoblament de la Conca de Barberà), però
  Saburella és dubtós. Per això es descarta fer-ne una afirmació històrica
  concreta al nom/marca; un nom genèric tipus "Castle Race" evita haver
  de confirmar-ho (el reclam és el repte esportiu, no la datació exacta).
  Track de referència (Suunto Route Planner):
  https://routeplanner.suunto.com/?route=mitja-marat-de-muntanya-castle-race-1791309317655&style=satellite&heatmap=running
  Encara sense desenvolupar — falta decidir nom definitiu, aconseguir el
  GPX exportat, redactar la història/context de cada castell (amb les
  dades verificades), i veure com encaixa amb el format de medalles/
  insígnies actual (potser calgui una insígnia pròpia per castell, a
  l'estil Ruta 4).
