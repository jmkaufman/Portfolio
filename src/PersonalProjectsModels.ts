export type PersonalProjectsDataModel = {
  personalProjects: PersonalProject[];
};

export type PersonalProject = {
  title: string;
  description: string;
  thumbnail: string;
  site: string;
  repo: string;
};
