export type Headline = {
  _id: string;
  headline: {
    main: string;
  };
  multimedia: { url?: string }[];
  pub_date: string;
  abstract: string;
  imageUrl?: string;
  byline?: { original: string };
  web_url?: string;
  keywords?: { value: string }[];
  source?: string;
  section_name?: string;
};


export interface HeadlineProps {
  headline: Headline;
}