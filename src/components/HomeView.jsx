import Hero from "./Hero.jsx";
import NextUp from "./NextUp.jsx";
import Legend from "./Legend.jsx";
import ChapterIndex from "./ChapterIndex.jsx";

export default function HomeView({
  hidden,
  months,
  startLabel,
  together,
  elapsed,
  openMonths,
  nextLocked,
  pendingManual,
  now,
  view,
  active,
  onSelectMonth,
}) {
  return (
    <section
      className="view home"
      id="view-home"
      aria-labelledby="home-title"
      hidden={hidden}
    >
      {!months.length ? (
        <div className="wrap">
          <div className="gallery__empty">
            <strong>Todavía no hay ningún capítulo.</strong>
            <span>
              Cuando se escriba el primero, esta portada se llenará sola.
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="wrap">
            <Hero
              startLabel={startLabel}
              together={together}
              elapsed={elapsed}
              openCount={openMonths.length}
              pendingCount={months.length - openMonths.length}
              lastOpen={openMonths[openMonths.length - 1] || null}
            />
          </div>

          <div className="wrap">
            <NextUp next={nextLocked} pendingManual={pendingManual} now={now} />
          </div>

          <div className="wrap">
            <Legend />
          </div>

          <div className="wrap">
            <ChapterIndex
              months={months}
              openCount={openMonths.length}
              view={view}
              active={active}
              onSelect={onSelectMonth}
            />
          </div>
        </>
      )}
    </section>
  );
}
