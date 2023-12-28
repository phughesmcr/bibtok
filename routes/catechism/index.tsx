import AppContainer from "../../components/AppContainer.tsx";
import Catechism from "../../db/catechism.json" assert { type: "json" };
import NavBar from "../../islands/NavBar.tsx";

export default function CatechismHome() {
  return (
    <AppContainer>
      <main role="main" class="min-w-0 min-h-0 w-full h-full">
        <div role="feed" class="w-full h-full overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2">
          {Catechism.map((c, index) => {
            return (
              <article key={index} class="ui catechism w-full h-full snap-start snap-always">
                <h1 class="w-full text-left">{c[0]}</h1>
                <p class="w-full text-left">{c[1]}</p>
              </article>
            );
          })}
        </div>
      </main>
      <nav role="navigation" className="min-w-0 min-h-0 w-full h-full">
        <NavBar />
      </nav>
    </AppContainer>
  );
}
