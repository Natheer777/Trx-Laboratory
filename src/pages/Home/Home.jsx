import React from 'react'
import { Footer, Navbar, WhyChoos ,Catego, ContactUs,Comments, Verfiy_product, Header, AboutUs, Blog, OUR_INJECTABLES, OUR_TABLETS, TOP_SEARCH } from '../../sections'

export default function Home() {
  return (
    <>
    <Navbar />
    <Header />
    {/* <AboutUs /> */}
    <Catego />
    <OUR_INJECTABLES />
    <OUR_TABLETS />
    <TOP_SEARCH />
    <WhyChoos />
    <Comments />
    <Blog />
    <ContactUs />
    <Verfiy_product />
    <Footer />
    </>
  )
}
