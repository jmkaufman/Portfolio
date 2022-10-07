export type WorkHistoryDataModel = {
  workHistory: WorkHistoryBlockPropsModel[];
};

export type WorkHistoryBlockPropsModel = {
  companyName: string;
  workProjects: WorkProject[];
};

export type WorkProject = {
  jobTitle: string;
  startDate: string;
  endDate: string;
  languages: string;
  frameworks: string;
};
