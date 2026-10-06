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

- **Ruta 5 (idea): mitja marató de muntanya — "Castells de la Reconquesta"**
  (nom provisional). Surt de Fontscaldetes i encadena les ruïnes de tres
  castells relativament propers: Selmella, Saburella i Vallespinosa.
  Concepte: relacionar-ho temàticament amb els castells/torres de la
  Reconquesta, pensat per atraure corredors de muntanya i caminadors de
  marxes de resistència (no excursionisme tranquil com la resta de rutes —
  públic més esportiu). Track de referència (Suunto Route Planner):
  https://routeplanner.suunto.com/?route=mitja-marat-de-muntanya-castle-race-1791309317655&style=satellite&heatmap=running
  Encara sense desenvolupar — falta decidir nom definitiu, aconseguir el
  GPX exportat, redactar la història/context de cada castell, i veure com
  encaixa amb el format de medalles/insígnies actual (potser calgui una
  insígnia pròpia per castell, a l'estil Ruta 4).
