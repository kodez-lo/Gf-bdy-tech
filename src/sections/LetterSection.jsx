import SectionHeading from '../components/SectionHeading';
import EnvelopeLetter from '../components/EnvelopeLetter';

export default function LetterSection(){return <section className="section-shell bg-[#160c12]"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><SectionHeading eyebrow="A note for you" title="Some things are better written slowly." copy="Open the envelope when you are ready."/><div className="mt-12"><EnvelopeLetter/></div></div></section>}
