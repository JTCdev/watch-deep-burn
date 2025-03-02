import DeepBackground from "./components/DeepBackrgound";
import DeepSupply from "./components/DeepSupply";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <DeepBackground />
      <DeepSupply />
    </main>
  );
}