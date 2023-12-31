import { Partial } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import Toolbar from "@islands/Toolbar.tsx";
import type { ApiResponse } from "@lib/types.ts";
import AppContainer from "../../components/AppContainer.tsx";
import Catechism from "../../db/catechism.json" assert { type: "json" };
import NavBar from "../../islands/NavBar.tsx";

export default function CatechismHome(props: PageProps<ApiResponse>) {
  return (
    <>
      <AppContainer>
        <main role="main" className="min-w-0 min-h-0 w-full h-full">
          <Toolbar />
          <Partial name="carousel">
            <div
              role="feed"
              className="w-full h-full overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2"
            >
              <article key={0} className="ui catechism w-full h-full snap-start snap-always">
                <h1>A Catechism</h1>
                <p>
                  From the 1662 Book of Common Prayer. <br />
                  <br />"An Instruction to be learned of every person before he be brought to be Confirmed by the
                  Bishop"
                </p>
                <small>
                  Extracts from The Book of Common Prayer, the rights in which are vested in the Crown, are reproduced
                  by permission of the Crown's patentee, Cambridge University Press.
                </small>
              </article>
              {Catechism.map((c, index) => {
                return (
                  <article key={index} className="ui catechism w-full h-full snap-start snap-always">
                    <h1>{c[0]}</h1>
                    <p>{c[1]}</p>
                  </article>
                );
              })}
            </div>
          </Partial>
        </main>
        <div className="min-w-0 min-h-0 w-full h-full">
          <NavBar />
        </div>
      </AppContainer>
    </>
  );
}
