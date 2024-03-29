export type Sample = {
  id: number;
  title: string;
  bpm?: number;
  key: string;
  scale: string;
  file_path: string;
  user_id?: number;
  created_at: string;
  genre_id: number;
  instrument_id: number;
  tags: Array<{
    id: number;
    name: string;
  }>;
  likes_count?: number;
  isLikedByCurrentUser?: boolean;
  profile_picture_path?: string;
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

export type TagType = {
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
