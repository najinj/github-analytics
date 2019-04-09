import GitServices from '../API/GitServices';
import { createStore, asyncState } from "global-hook-store";
import {TimeSeries, TimeRange} from "pondjs";
type author = {
  login : string
}
type commit = {
  author : author
}
type PieData = {
  id:number,
  label:number,
  value:number,
  color: string
}
type Repository = {
  license : any,
  full_name : string,
  langage : string,
  description : string,
  RepositoryId : string,
  id : number,
  owner:string,
  created_at:string,
  updated_at:string,
  watchers:number
}
type Contributor = {
  html_url : string,
  contributions : number,
  avatar_url : string,
  login :  string,
}

const repositoryStore = createStore({
  repository : asyncState<any>({}),
  full_name : ""
  },
  {
  fetchingRepo: async (state, {id}, { asyncAction }) =>
      asyncAction("repository", GitServices.getRepository(id)),
  reset: (_state, _payload: null, { reset }) => reset()
});

const commitsStore = createStore(
  {
    commits : asyncState<any>([]),
    statics : [],
    limit : 100,
    timerange: null,
    seriesCommit : null,
    loading : true
  },
  {
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setTimeRage: (state, timerange: any) => ({ ...state, timerange }),
    setSeriesCommit: (state, seriesCommit: any) => ({ ...state, seriesCommit }),
    setStatics: (state, statics: any) => ({ ...state, statics }),
    fetchingCommits: async(state, {full_name}, {asyncAction}) =>
        asyncAction("commits",
        GitServices.getCommits(full_name,state.limit)),
    reset: (_state, _payload: null, { reset }) => reset()
  }
);

const contributorsStore = createStore({
    contributors : asyncState<any>([]),
    get contributorsCount() {
        return  0
    },
    //nameQuery : "",
    offset : 1,
    limit : 30,
  },
  {
    //setNameQuery: (state, nameQuery: string) => ({ ...state, nameQuery }),
    setOffset: (state, offset: number) => ({ ...state, offset }),
    setLimit: (state, limit: number) => ({ ...state, limit }),
    fetchingContributors: async(state, {name}, {asyncAction}) =>
        asyncAction("contributors",
        GitServices.getContributors(name,state.offset,state.limit)),
    reset: (_state, _payload: null, { reset }) => reset()
  });

const githubStore = createStore(
  {
    repos: asyncState<any>([]),
    nameQuery : "",
    offset : 1,
    limit : 10,
    get resposCount() {
        return this.repos.data.length || 0
    }
    },
    {
    setNameQuery: (state, nameQuery: string) => ({ ...state, nameQuery }),
    setOffset: (state, offset: number) => ({ ...state, offset }),
    setLimit: (state, limit: number) => ({ ...state, limit }),
    fetchingRepos: async({nameQuery,offset,limit}, _payload, {asyncAction}) =>
        asyncAction(
          "repos",
          GitServices.SearchRepositories(nameQuery,offset,limit)
        ),
    reset: (_state, _payload: null, { reset }) => reset()

  });

export {
  githubStore,
  contributorsStore,
  repositoryStore,
  commitsStore
}
