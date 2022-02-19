import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IMovies {
  popular: {
    
    totalPages: number | null;
    results: any[];
},

search: { 
    
  searchTotalPages: number | null;
  searchResults: any;
  query:string;
},

favorites: any[],
currentMovie: null;
  };
const baceUrl = process.env.REACT_APP_BASE_URL;
const authToken = process.env.REACT_APP_AUTH_TOKEN;

 

const initialState = { 
  popular: {    
    totalPages: null, 
    results: [],
  },

  search: {    
    searchTotalPages: null, 
    searchResults: null,
    query: "",
  },
  favorites: [],
  
  currentMovie: null
} as IMovies;


export const fetchMoviesList = createAsyncThunk(
    'movies/fetchMoviesList',
    async (page:number = 1 ) => {
      const responce = await fetch(`${baceUrl}/3/movie/popular?api_key=${authToken}&page=${page}`)
        .then(res => res.json())
        .then(json => json);

        return {
          totalPages: responce.total_pages,
          results: responce.results
        };
    }   
  )

  export const fetchMoviesDetails = createAsyncThunk(
    'movies/fetchMoviesDetails',
    async (id:number) => {
      const responce = await fetch(`${baceUrl}/3/movie/${id}?api_key=${authToken}`)
        .then(res => res.json())
        .then(json => json);

        return responce; 
    }   
  )



  export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async (query: string) => {
      const responce = await fetch(`${baceUrl}/3/search/movie?api_key=${authToken}&page=1&include_adult=false&query=${query}`)
        .then(res => res.json())
        .then(json => json);




        return {
          totalPages: responce.total_pages,
          results: responce.results,
          query,
        };
    }   
  )


  export const receiveMoreMovies = createAsyncThunk(
    'movies/receiveMoreMovies',
    async ({query, page}: any = 2) => {
      const responce = await fetch(`${baceUrl}/3/search/movie?api_key=${authToken}&page=${page}&include_adult=false&query=${query}`)
        .then(res => res.json())
        .then(json => json);




        return {
          totalPages: responce.total_pages,
          results: responce.results
        };
    }   
  )







const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
      toggleToFavorites(state, action:any) {
       const filmExist = state.favorites.find((film) =>{
          return film.id === action.payload.id;


        })

        if (filmExist){
          state.favorites = state.favorites.filter((film: any)=>{


            return film.id !== filmExist.id
          });
        
          return;
        
        }


          state.favorites.push(action.payload);
      }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
      state.popular.results.push(...action.payload.results)
      state.popular.totalPages = action.payload.totalPages ;
      
    });
    builder.addCase(fetchMoviesDetails.fulfilled, (state, action) => {
      state.currentMovie = {...action.payload};
    });

    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.search.searchResults = [...action.payload.results];
      state.search.searchTotalPages = action.payload.totalPages ;
      state.search.query = action.payload.query ;
    });
   
    builder.addCase(receiveMoreMovies.fulfilled, (state, action) => {
      state.search.searchResults.push(...action.payload.results);
      state.search.searchTotalPages = action.payload.totalPages ;
    });


  }

});

export const {toggleToFavorites} = moviesSlice.actions
export default moviesSlice.reducer;
