export type Headline = {
  _id: string;
  headline: {
    main: string;
  };
  multimedia: { url?: string }[];
  pub_date: string;
  abstract: string;
};


export interface HeadlineProps {
  headline: Headline;
}