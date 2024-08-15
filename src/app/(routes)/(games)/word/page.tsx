import WordAppbar from './_components/word-appbar';
import WordGetPoints from './_components/word-get-points';
import WordExperience from './_components/word-experience';
import WordPlayHeader from './_components/word-play-header';
import WordCompetitive from './_components/word-competitive';
import WordHomeSection from './_components/word-home-section';

export default function WordHomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <WordAppbar />
      <WordHomeSection />
      <WordPlayHeader />
      <WordExperience />
      <WordCompetitive />
      <WordGetPoints />
    </div>
  );
}
