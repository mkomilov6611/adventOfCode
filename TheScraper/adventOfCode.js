import axios from "axios";

const LANGUAGE_WANTED = "JavaScript";
const SORTING_TYPE = "updated";
const ORDER_TYPE = "desc";
const KEY = `advent of code ${new Date().getFullYear()}`;
const DAY = new Date().getDate();

(async function scrapeAdventOfCode() {
  // get all updated repos for each day accordingly, in the correct time period
  // see if repo has todays problem solved
  // scrape it
  // run the code with private input
  // post the output :tada:

  let fileWeWant = null;
  const solutions = {
    part1: null,
    part2: null,
  };

  const allUpdatedReposResult = await axios
    .get(
      `https://api.github.com/search/repositories?q=${KEY}+language:${LANGUAGE_WANTED}&sort=${SORTING_TYPE}&order=${ORDER_TYPE}`
    )
    .catch((error) => {
      console.log("ERROR: allUpdatedRepos: " + error.message);
    });

  const allUpdatedRepos = allUpdatedReposResult?.data?.items;

  const hasFoundTheSolution = allUpdatedRepos.some((repo) => {
    console.log({ REPO: repo.contents_url });
    // here we get the correct url from the given url, wihouth path -> root
    const lastIndexToCut = repo.contents_url.lastIndexOf("/");
    const rootOfTheRepoURL = repo.contents_url.slice(0, lastIndexToCut);

    checkForFileWeWant(rootOfTheRepoURL).then((response) => {
      if (response) return true;
      else return false;
    });
  });

  if (hasFoundTheSolution) {
    // commit it
    console.log("FOUND IT: ", fileWeWant);
  }
})();

async function checkForFileWeWant(url) {
  const filesResult = await axios.get(url).catch((error) => {
    console.log("ERROR: checkForFileWeWant: " + error.message);
  });

  let files = filesResult?.data || filesResult;

  console.log({ files });

  return files.some((fileOrFolder) => {
    if (fileOrFolder.name.includes(DAY) && fileOrFolder.name.includes(".js")) {
      fileWeWant = fileOrFolder;
      return true;
    }

    if (fileOrFolder.type === "dir") {
      // check the dir files also
      checkForFileWeWant(fileOrFolder.url).then((result) => {
        if (result) return true;
        else return false;
      });
    }

    return false;
  });
}
