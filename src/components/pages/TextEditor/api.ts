import { routesGetApi, routesPostApi } from '../../../api/apis';

// const createNote = async() => {
//   try {
//     routesPostApi()
//   } catch(error) {

//   }
// }

export const getNotes = async () => {
  try {
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNWMyOTU0ZS03YTU3LTRiNWMtYTkxNC1mN2RhMjkyYTJmNWQiLCJpYXQiOjE2ODU3NzkyMjIzODgsImV4cCI6MTY4NTc3OTMwODc4OH0.EI9wHT6VhyEpQbRalJ1veqT6PIL6_0lNQG4CLfBzArv3rXOLqYlizh3BjwEiQxEe_eQD_IiQmH9ojmpsR4ee1icsBMxPk-LJdTIrbTGuNTPX_DzB-_qKZIFkT7regK0qX7pUbrQG90rdHWMRpTAP_qyACw7VFB0MU5udhC97DqbCbyNmeKCsjQFYMa6B69GoyR0fGvkKXS-x5mUi45x7uicPFpkvKipnvIRi5njT0ZkPkkFT-oFmSaEYCCuN2-OkV727qEdownQiXtfVZXx9JWM4us84k_-RnZ1EF3GeMM3XDOIJLXZiNqToRhCKO6Zte0S61nAldIsW2XwSZCla8ZhQOQhvUrf37NCFdPJWhiluuvryluw2b3FS0eNTU9m08T_wGY806b7KQRaaDvIj3cNgfTvp-mT37kUu_ZLEaABlJ5zJyyJ7nOnLrAb3FyIj0kC1TtSXX4ent-PwLB3-1oKiur4_G_AUuO3xLWQPO9JkWNjVs6VbDobfqorO3prsDIE15SFvCCmI-Qu8WJNjF-u4k3FlBxeCoKZSmov9y36pewtdX6NysbM0BZejSHu-P3nX3hDVSmjsDyGiGfef-GaSLG2P4SgFtAfDXKmtYFMxHPUmxsAbMdTL7j18KNZSG-tGFQdsv3BHto85AZqG78ix4iv5MlF1DlPDxyCEu_E';
    const params = {
      routeName: 'http://localhost:5632/notes',
      config: {
        headers: { Authorization: `Bearer ${token}` },
      },
    };

    // return {
    //   time: 1685780375239,
    //   version: '2.27.0',
    //   blocks: [
    //     {
    //       id: 'KlDeA9o6DD',
    //       type: 'paragraph',
    //       data: {
    //         text: 'hehe',
    //       },
    //     },
    //   ],
    // };

    const response = await routesGetApi({ ...params });
    console.log('response', response.data);

    const blocks = response.data.map((note: any) => {
      return {
        id: note.uuid,
        type: 'paragraph',
        data: {
          text: note.title,
        },
      };
    });

    console.log('blocks', blocks);

    return {
      time: 1685780375239,
      version: '2.27.0',
      blocks,
    };

    return response;
  } catch (error) {
    console.log('error');
  }
};
