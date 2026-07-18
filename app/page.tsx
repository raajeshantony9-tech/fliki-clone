import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromptBox from "@/components/PromptBox";
import VideoTypeSelector from "@/components/VideoTypeSelector";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-6 py-20">
        <Hero />

        <VideoTypeSelector />

        <PromptBox />
      </div>
    </main>
  );
}