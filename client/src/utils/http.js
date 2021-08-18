const request = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (res.status === 200) {
      const json = await res.json();
      return json;
    }
    throw new Error(res.status);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const login = async (data) => {
  try {
    const res = await request('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { request, login };
