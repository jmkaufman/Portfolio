export type PersonalProjectsDataModel = {
  personalProjects: PersonalProject[]
}

export type PersonalProject = {
  title: string;
  description: string;
  thumbnail: string;
  route: string;
  repo: string;
}