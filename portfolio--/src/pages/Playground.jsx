import React, { useState, useEffect, lazy } from "react";
import { Text } from "@components/ui/Text.jsx";
import { FadeIn } from "@hooks/FadeIn.jsx";
import { BounceInView } from "@hooks/useBounceInView.jsx";
import PlaygroundFilterMenu from "@components/Playground/PlaygroundFilterMenu.jsx";
import Description from "@components/Playground/Description.jsx";
import Footer from "@components/Skeleton/Footer.jsx";
import "@pages/Pages.css";

const Card = lazy(() => import("@ui/Card"));

const PlaygroundHeader = () => {
  return (
    <FadeIn duration={0.6} delay={0}>
      <div className="playground-text-container">
        <Text type="h1" className="home-title text h1">
          Playground
        </Text>
        <Description />
      </div>
    </FadeIn>
  );
};

const PlaygroundGrid = ({ filteredPlaygrounds, Card }) => {
  if (filteredPlaygrounds.length === 0) {
    return <p>No playgrounds available.</p>;
  }

  return (
    <FadeIn duration={0.8} delay={0.1}>
      <div className="playground-content-container">
        {filteredPlaygrounds.map((playground) => (
          <BounceInView key={playground._id}>
            <Card project={playground} />
          </BounceInView>
        ))}
      </div>
    </FadeIn>
  );
};

 const preloadCriticalImages = (playgrounds) => {
  const preloadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve;
    });
  };

  const criticalImages = playgrounds.flatMap((playground) =>
    playground.primaryImage.slice(0, 1).map((image) => preloadImage(image))
  );

  return Promise.all(criticalImages);
};


function Playground({ projects }) {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    // Filter playground projects
    const playgroundProjects = projects.filter(
      (item) => item.schemaType === "playground"
    );

    // Sort playgrounds by the "created" field 
    const sortedPlaygrounds = [...playgroundProjects].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    // Preload all card images before rendering the page
    preloadCriticalImages(sortedPlaygrounds).then(() => {
      setPlaygrounds(sortedPlaygrounds);
      setFilteredPlaygrounds(sortedPlaygrounds);
    });
  }, [projects]);

  useEffect(() => {
    const filterMapping = {
      ALL: "ALL",
      UX: "ux",
      ILLUST: "illustration",
    };

    if (filter === "ALL") {
      setFilteredPlaygrounds(playgrounds);
    } else {
      setFilteredPlaygrounds(
        playgrounds.filter(
          (playground) =>
            playground.type.toLowerCase() ===
            filterMapping[filter].toLowerCase()
        )
      );
    }
  }, [filter, playgrounds]);

  // Scroll to the top of the grid when the filter changes
 useEffect(() => {
   const gridElement = document.querySelector(".playground-content-container");
   if (gridElement) {
     gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
   }
 }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === "ALL") {
      setFilteredPlaygrounds(playgrounds);
    } else {
      setFilteredPlaygrounds(
        playgrounds.filter(
          (playground) => playground.type === newFilter.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="playground-container">
      <PlaygroundHeader />
      <PlaygroundGrid filteredPlaygrounds={filteredPlaygrounds} Card={Card} />
      <PlaygroundFilterMenu
        currentFilter={filter}
        setFilter={handleFilterChange}
      />
      <Footer/>
    </div>
  );
}

export default Playground;