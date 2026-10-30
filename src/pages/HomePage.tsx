import { Hero } from '../components/hero/Hero'
import { PopularRoutesSection } from '../components/home/PopularRoutesSection'
import { WhySection } from '../components/home/WhySection'
import { HowItWorksSection } from '../components/home/HowItWorksSection'
import { DestinationsSection } from '../components/home/DestinationsSection'
import { TrustSection } from '../components/home/TrustSection'
import { FaqSection } from '../components/home/FaqSection'
import { FinalCta } from '../components/home/FinalCta'

export function HomePage() {
  return (
    <>
      <Hero />
      <PopularRoutesSection />
      <WhySection />
      <HowItWorksSection />
      <DestinationsSection />
      <TrustSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
