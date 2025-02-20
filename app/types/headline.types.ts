export type Headline = {
  _id: string;
  headline: {
    main: string;
  };
  multimedia: { url?: string }[];
  pub_date: string;
  abstract: string;
  imageUrl?: string;
};


export interface HeadlineProps {
  headline: Headline;
}