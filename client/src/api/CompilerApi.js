import HttpHelper from './HttpHelper';


function requestHeaders() {
    return { 'Content-Type': 'application/json' };
}

export async function getTask(lang) {
  const response = await HttpHelper.fetch(
      `http://localhost:8080/api/file/${lang}`,
      'GET',
      requestHeaders(),
      null,
    );
    return response;
}

export async function run(answer) {
    const result= await HttpHelper.fetch(
      `http://localhost:8080/api/run/`,
      'POST',
      requestHeaders(),
      JSON.stringify(answer),
    );
    return result;
}


