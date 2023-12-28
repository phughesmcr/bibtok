import AppContainer from "../../components/AppContainer.tsx";
import Catechism from "../../db/catechism.json" assert { type: "json" };
import NavBar from "../../islands/NavBar.tsx";

export default function CatechismHome() {
  return (
    <AppContainer>
      <main role="main" class="min-w-0 min-h-0 w-full h-full">
        <div role="feed" class="w-full h-full overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2">
          <article key={0} class="ui catechism w-full h-full snap-start snap-always">
            <h1>A Catechism</h1>
            <p>
              From the 1662 Book of Common Prayer. <br />
              <br />"An Instruction to be learned of every person before he be brought to be Confirmed by the Bishop"
            </p>
            <small>
              Extracts from The Book of Common Prayer, the rights in which are vested in the Crown, are reproduced by
              permission of the Crown's patentee, Cambridge University Press.
            </small>
          </article>
          {Catechism.map((c, index) => {
            return (
              <article key={index} class="ui catechism w-full h-full snap-start snap-always">
                <h1>{c[0]}</h1>
                <p>{c[1]}</p>
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
