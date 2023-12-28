import AppContainer from "../../components/AppContainer.tsx";
import NavBar from "../../islands/NavBar.tsx";

export default function CatechismHome() {
  return (
    <AppContainer>
      <main role="main" className="min-w-0 min-h-0 w-full h-full">
        <h1>Catechism</h1>
        <p>Coming soon</p>
      </main>
      <nav role="navigation" className="min-w-0 min-h-0 w-full h-full">
        <NavBar />
      </nav>
    </AppContainer>
  );
}
