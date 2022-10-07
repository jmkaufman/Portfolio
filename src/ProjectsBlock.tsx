import { PersonalProject } from "./PersonalProjectsModels";

function ProjectsBlock(props: PersonalProject): JSX.Element {
  let { title, description, thumbnail, site, repo } = props;

  return (
    <div className="project-block">
      <h3>{title}</h3>
      <p>{description}</p>
      {/*Try to keep thumbnails 350x233*/}
      <img
        className="thumbnail"
        src={"/thumbnails/" + thumbnail}
        alt={title + " thumbnail"}
      />
      <br />
      <a href={site} target="_blank" rel="noreferrer">
        View it here!
      </a>
      <br />
      <a href={repo} target="_blank" rel="noreferrer">
        Github Repository
      </a>
      <br />
    </div>
  );
}

export default ProjectsBlock;
