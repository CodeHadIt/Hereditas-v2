import React from 'react'
import BeneficiaryCta from './beneficiaryCta'
import ContactBox from './contactBox'
import HomeCta from './cta'
import How from './how'
import Stats from './stats'
import TestatorCta from './testatorCta'

const HomeMain = () => {
  return (
    <>
        <HomeCta />
        <How />
        <TestatorCta />
        <BeneficiaryCta />
        <Stats />
        <ContactBox />
    </>
  )
}

export default HomeMain