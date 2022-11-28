import { useState, useEffect } from "react";
import Header from "./components/Header";
import Data from "./data.json";
import "./App.css";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const newJobs = handleFilterJobsByTags();
    setJobs(newJobs);

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
  }, [tags]);

  useEffect(() => {
    setJobs(Data);
  }, []);

  const handleAddTag = (tag) => {
    if (tags.includes(tag)) return;
    setTags([...tags, tag]);
  };

  const handleFilterJobsByTags = () => {
    const filteredJobs = Data.filter(({ role, level, tools, languages }) => {
      if (tags.length === 0) {
        return true;
      }

      let filterTags = [role, level];
      if (tools) filterTags = [...filterTags, ...tools];
      if (languages) filterTags = [...filterTags, ...languages];

      return tags.every((tag) => filterTags.includes(tag));
    });

    return filteredJobs;
  };

  const handleResetTags = () => {
    setJobs(Data);
    setTags([]);
  };

  const handleRemoveJobByTag = (tagParam) => {
    const tagsFiltered = tags.filter((tag) => tag !== tagParam);
    setTags(tagsFiltered);
  };

  return (
    <>
      <Header />
      <main className="container">
        {tags.length > 0 && (
          <div className="filter-tags">
            <div>
              {tags.map((tag) => (
                <div key={tag} className="filter-tags-label">
                  <span>{tag}</span>
                  <button onClick={() => handleRemoveJobByTag(tag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                      <path
                        fill="#FFF"
                        fillRule="evenodd"
                        d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleResetTags} className="filter-tags-clear">
              Clear all
            </button>
          </div>
        )}

        {jobs.length == 0 ? (
          <p className="card-job-error">No hay vacantes con esas especificaciones</p>
        ) : (
          jobs.map((job) => (
            <article key={job.id} className={`card-job ${job.new && job.featured ? "special" : ''}`}>
              <div className="card-job-info">
                <img src={`/${job.logo}`} alt={job.company} />
                <div>
                  <div className="card-job-info-header">
                    <h3>{job.company}</h3>
                    {job.new && <span>NEW!</span>}
                    {job.featured && <span>FEATURED</span>}
                  </div>
                  <h2 className="card-job-info-title">{job.position}</h2>
                  <ul className="card-job-info-features">
                    <li>{job.postedAt}</li>
                    <li>{job.contract}</li>
                    <li>{job.location}</li>
                  </ul>
                </div>
              </div>
              <div className="card-job-tags">
                <button onClick={() => handleAddTag(job.role)}>{job.role}</button>
                <button onClick={() => handleAddTag(job.level)}>{job.level}</button>
                {job.tools.map((tool) => (
                  <button key={tool} onClick={() => handleAddTag(tool)}>
                    {tool}
                  </button>
                ))}
                {job.languages.map((language) => (
                  <button key={language} onClick={() => handleAddTag(language)}>
                    {language}
                  </button>
                ))}
              </div>
            </article>
          ))
        )}
      </main>
    </>
  );
};

export default App;
