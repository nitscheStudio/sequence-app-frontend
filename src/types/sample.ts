export type SampleOld = {
  bpm: number;
  created_at: string;
  file_path: string;
  genre_id: number;
  id: number;
  instrument_id: number;
  key: string;
  likes_count: number;
  scale: string;
  tags: [];
  title: string;
  type: string;
  updated_at: string;
  user_id: number;
};

export type Sample = {
  id: number;
  title: string;
  bpm: number;
  key: string;
  scale: string;
  type: string;
  file_path: string;
  user_id: number;
  created_at: string;
  genre: string;
  instrument: string;
  tags: Array<{
    id: number;
    name: string;
  }>;
  likes_count: number;
};

// export type Tag = {
//   id: number;
//   name: string;
//   created_at: string;
//   updated_at: string;
//   pivot: {
//     sample_id: number;
//     tag_id: number;
//   };
// };

export type Tag = {
  id: number;
  name: string;
};

export type SearchResultsHits = {
  id: number;
  title: string;
  bpm: number;
  key: string;
  scale: string;
  type: string;
  file_path: string;
  created_at: string; // or Date if you prefer to work with Date objects
  genre: string;
  instrument: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
  likes_count: number;
};
