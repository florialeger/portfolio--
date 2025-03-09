import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Project.css';

const ProjectDetail = () => {
  const { slug } = useParams(); // Assurez-vous que le paramètre est bien "slug"
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${slug}`)
      .then(response => {
        setProject(response.data);
        if (response.data.imageUrl) {
          const imagePath = `http://localhost:5000/assets/img/${response.data.imageUrl}`;
          setImageUrl(imagePath);
        }
        if (response.data.secondaryImages) {
          const imagePromises = response.data.secondaryImages.map(image =>
            axios.get(`http://localhost:5000/assets/img/${image}`, { responseType: 'blob' })
              .then(res => URL.createObjectURL(res.data))
          );
          Promise.all(imagePromises)
            .then(setSecondaryImages)
            .catch((error) => console.error('Error loading secondary images:', error));
        }
      })
      .catch(error => console.error(error));
  }, [slug]);

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  if (!project) return null;

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const previousProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="project-detail">
      <img src={imageUrl} alt={project.title} />
      <div className="project-details">
        <h2>{project.title}</h2>
      
        <div className="secondary-images-grid">
          {secondaryImages.map((image, index) => (
            <img key={index} src={image} alt={`Secondary ${index}`} />
          ))}
        </div>
        <div className="navigation-buttons">
          {previousProject && <Link to={`/work/${previousProject.slug}`}>Previous</Link>}
          {nextProject && <Link to={`/work/${nextProject.slug}`}>Next</Link>}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;