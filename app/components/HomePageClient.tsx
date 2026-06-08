"use client";

import { useReveal } from "./home/useReveal";
import Nav from "./home/Nav";
import Hero from "./home/Hero";
import Ticker from "./home/Ticker";
import Stats from "./home/Stats";
import FacesWall from "./home/FacesWall";
import HowWeWork from "./home/HowWeWork";
import Atlas from "./home/Atlas";
import Playbooks from "./home/Playbooks";
import Database from "./home/Database";
import Community from "./home/Community";
import Donate from "./home/Donate";
import BigCTA from "./home/BigCTA";
import Footer from "./home/Footer";

export default function HomePageClient() {
  useReveal();

  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Stats />
      <FacesWall />
      <HowWeWork />
      <Atlas />
      <Playbooks />
      <Database />
      <Community />
      <Donate />
      <BigCTA />
      <Footer />
    </>
  );
}
