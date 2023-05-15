import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard, BannerCard } from '../components';
import { genres } from '../assets/constants';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';


const Discover = () => {

  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  if (isFetching) return <Loader title='Loading songs...' />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-2 mb-10'>
        {/* 
          TODO: improve UX/UI 
          create a component(CenterCard.jsx) with an center image, more static.
          fix font-size, align items, try to make it more clear and minimal.

          readme: XD || PS background
        */}
        <h2 className='text-xl mt-2 text-gray-100 text-left'>
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className='bg-white/10 backdrop-blur-sm text-gray-100 p-2 text-xs rounded-2xl outline-none sm:mt-0 mt-5'
        >
          {genres.map((genre) =>
            <option 
              key={genre.value} 
              value={genre.value}
            >
              {genre.title}
            </option>
          )}

        </select>
      </div>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>


        <BannerCard />


        {data?.map((song, index) => (
          <SongCard 
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            index={index}
          />
        )
        )}
      </div>
    </div>
  );
};

export default Discover;