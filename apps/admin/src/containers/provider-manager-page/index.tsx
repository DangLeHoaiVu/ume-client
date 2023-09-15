import { Search } from '@icon-park/react'
import { Button, Input } from '@ume/ui'

import React, { useState } from 'react'

import Head from 'next/head'
import { FilterProviderPagingResponse } from 'ume-service-openapi'

import TableProviders from '~/components/custom-table'

import { trpc } from '~/utils/trpc'

const ProviderManager = () => {
  // const [providerList, setProviderList] = useState<FilterProviderPagingResponse | undefined>()

  // const { isLoading: isUserListLoading, isFetching: isUserListFetching } = trpc.useQuery(
  //   [
  //     'provider.getProvider',
  //     {
  //       limit: '10',
  //       page: '1',
  //       order: '[]',
  //     },
  //   ],
  //   {
  //     onSuccess(data) {
  //       setProviderList(data.data)
  //     },
  //   },
  // )
  // console.log(providerList)

  const data = [
    {
      key: 1,
      name: 'Perri',
      Gmail: 'paleksic0@example.com',
      phone: '647-991-1343',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '8/11/2022',
    },
    {
      key: 2,
      name: 'Preston',
      Gmail: 'prudiger1@mtv.com',
      phone: '726-342-0653',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '23/5/2023',
    },
    {
      key: 3,
      name: 'Elihu',
      Gmail: 'eshortland2@engadget.com',
      phone: '761-828-8465',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '9/12/2022',
    },
    {
      key: 4,
      name: 'Wheeler',
      Gmail: 'wgabites3@liveinternet.ru',
      phone: '740-828-6018',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '26/4/2023',
    },
    {
      key: 5,
      name: 'Tedra',
      Gmail: 'tmorrilly4@addtoany.com',
      phone: '158-199-8088',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '9/5/2023',
    },
    {
      key: 6,
      name: 'Joelly',
      Gmail: 'jphilippeaux5@goodreads.com',
      phone: '916-588-9801',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '7/4/2023',
    },
    {
      key: 7,
      name: 'Boot',
      Gmail: 'bdurno6@jigsy.com',
      phone: '295-291-5885',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '28/7/2023',
    },
    {
      key: 8,
      name: 'Pavlov',
      Gmail: 'pasken7@is.gd',
      phone: '922-534-7036',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '7/6/2023',
    },
    {
      key: 9,
      name: 'Barbabas',
      Gmail: 'bferrandez8@seesaa.net',
      phone: '526-341-7993',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '8/9/2023',
    },
    {
      key: 10,
      name: 'Devland',
      Gmail: 'dbrowncey9@cnbc.com',
      phone: '348-571-7936',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '28/6/2023',
    },
    {
      key: 11,
      name: 'Stevana',
      Gmail: 'sdillanda@bandcamp.com',
      phone: '198-451-2744',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '25/10/2022',
    },
    {
      key: 12,
      name: 'Petronille',
      Gmail: 'prabatb@sciencedaily.com',
      phone: '481-426-1975',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '18/12/2022',
    },
    {
      key: 13,
      name: 'Chaddie',
      Gmail: 'clinggoodc@amazon.co.jp',
      phone: '356-755-4680',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '26/9/2022',
    },
    {
      key: 14,
      name: 'Danita',
      Gmail: 'dtelezhkind@cargocollective.com',
      phone: '128-435-4055',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '17/6/2023',
    },
    {
      key: 15,
      name: 'Matthew',
      Gmail: 'mdewerke@answers.com',
      phone: '561-289-2521',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '23/10/2022',
    },
    {
      key: 16,
      name: 'Sheryl',
      Gmail: 'sdixeyf@hud.gov',
      phone: '381-697-4426',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '19/7/2023',
    },
    {
      key: 17,
      name: 'Carlita',
      Gmail: 'cmecchig@zdnet.com',
      phone: '150-262-4822',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '19/10/2022',
    },
    {
      key: 18,
      name: 'Shannon',
      Gmail: 'sszapiroh@ed.gov',
      phone: '504-610-7385',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '16/12/2022',
    },
    {
      key: 19,
      name: 'Cacilia',
      Gmail: 'cdanzeyi@house.gov',
      phone: '798-456-0491',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '7/2/2023',
    },
    {
      key: 20,
      name: 'Kristine',
      Gmail: 'kjerschkej@washingtonpost.com',
      phone: '314-259-3329',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '17/4/2023',
    },
    {
      key: 21,
      name: 'Halli',
      Gmail: 'hbroxupk@squarespace.com',
      phone: '331-407-4969',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '11/6/2023',
    },
    {
      key: 22,
      name: 'Audrey',
      Gmail: 'avonnassaul@squidoo.com',
      phone: '372-807-9676',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '30/11/2022',
    },
    {
      key: 23,
      name: 'Stacie',
      Gmail: 'sgummoem@miitbeian.gov.cn',
      phone: '897-496-9927',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '14/9/2022',
    },
    {
      key: 24,
      name: 'Lorianne',
      Gmail: 'lmcpheen@hc360.com',
      phone: '474-920-8076',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '7/11/2022',
    },
    {
      key: 25,
      name: 'Garret',
      Gmail: 'ghitchamo@princeton.edu',
      phone: '346-824-9777',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '10/12/2022',
    },
    {
      key: 26,
      name: 'Brandie',
      Gmail: 'bgrinikhinovp@smugmug.com',
      phone: '202-818-4264',
      gender: 'Genderfluid',
      status: 'Bị Chặn',
      joinDate: '23/5/2023',
    },
    {
      key: 27,
      name: 'Missie',
      Gmail: 'mpardonq@state.gov',
      phone: '228-752-3095',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '10/3/2023',
    },
    {
      key: 28,
      name: 'Gayelord',
      Gmail: 'gdiversr@odnoklassniki.ru',
      phone: '660-349-5454',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '20/5/2023',
    },
    {
      key: 29,
      name: 'Leroy',
      Gmail: 'lmarshallecks@icq.com',
      phone: '887-426-8843',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '20/9/2022',
    },
    {
      key: 30,
      name: 'Karole',
      Gmail: 'kglowinskit@dmoz.org',
      phone: '375-590-6144',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '20/10/2022',
    },
    {
      key: 31,
      name: 'Honoria',
      Gmail: 'hropsu@hc360.com',
      phone: '384-101-8509',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '18/12/2022',
    },
    {
      key: 32,
      name: 'Joyan',
      Gmail: 'jwonterv@sakura.ne.jp',
      phone: '731-888-3208',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '17/2/2023',
    },
    {
      key: 33,
      name: 'Claiborn',
      Gmail: 'ctringhamw@ftc.gov',
      phone: '673-636-3278',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '7/1/2023',
    },
    {
      key: 34,
      name: 'Selestina',
      Gmail: 'sdemerx@scribd.com',
      phone: '956-380-8532',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '13/7/2023',
    },
    {
      key: 35,
      name: 'Lebbie',
      Gmail: 'lrowcastley@stanford.edu',
      phone: '509-437-1846',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '7/3/2023',
    },
    {
      key: 36,
      name: 'Chip',
      Gmail: 'cblumsonz@msu.edu',
      phone: '901-519-6131',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '1/9/2023',
    },
    {
      key: 37,
      name: 'Garrott',
      Gmail: 'gdedomenicis10@samsung.com',
      phone: '833-329-0473',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '29/6/2023',
    },
    {
      key: 38,
      name: 'Bailey',
      Gmail: 'bbozier11@simplemachines.org',
      phone: '295-834-4725',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '14/11/2022',
    },
    {
      key: 39,
      name: 'Tremaine',
      Gmail: 'tivanisov12@nature.com',
      phone: '239-998-5441',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '26/6/2023',
    },
    {
      key: 40,
      name: 'Shauna',
      Gmail: 'scamp13@aboutads.info',
      phone: '412-634-5776',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '11/12/2022',
    },
    {
      key: 41,
      name: 'Malorie',
      Gmail: 'mliversidge14@dyndns.org',
      phone: '858-607-6831',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '20/7/2023',
    },
    {
      key: 42,
      name: 'Elinore',
      Gmail: 'eredborn15@behance.net',
      phone: '186-465-0168',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '1/3/2023',
    },
    {
      key: 43,
      name: 'Berky',
      Gmail: 'bbutter16@reference.com',
      phone: '116-591-3582',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '28/8/2023',
    },
    {
      key: 44,
      name: 'Hubie',
      Gmail: 'hsnazle17@boston.com',
      phone: '994-884-2275',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '24/10/2022',
    },
    {
      key: 45,
      name: 'Kevon',
      Gmail: 'kshepeard18@apache.org',
      phone: '948-462-8949',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '9/9/2023',
    },
    {
      key: 46,
      name: 'Lorna',
      Gmail: 'leplate19@cyberchimps.com',
      phone: '186-481-7318',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '18/8/2023',
    },
    {
      key: 47,
      name: 'Alexio',
      Gmail: 'aruggiero1a@163.com',
      phone: '202-812-2023',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '15/5/2023',
    },
    {
      key: 48,
      name: 'Kenneth',
      Gmail: 'ksale1b@domainmarket.com',
      phone: '531-430-0924',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '9/11/2022',
    },
    {
      key: 49,
      name: 'Meggi',
      Gmail: 'mdurrett1c@diigo.com',
      phone: '499-316-3264',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '4/10/2022',
    },
    {
      key: 50,
      name: 'Thomasina',
      Gmail: 'ttompkiss1d@harvard.edu',
      phone: '703-515-7618',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '1/3/2023',
    },
    {
      key: 51,
      name: 'Pearce',
      Gmail: 'pbenitez1e@uol.com.br',
      phone: '500-403-1798',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '15/9/2022',
    },
    {
      key: 52,
      name: 'Yovonnda',
      Gmail: 'yrohlf1f@surveymonkey.com',
      phone: '997-297-0866',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '4/7/2023',
    },
    {
      key: 53,
      name: 'Maurine',
      Gmail: 'mchampagne1g@amazon.co.uk',
      phone: '542-841-6478',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '23/9/2022',
    },
    {
      key: 54,
      name: 'Keefer',
      Gmail: 'kkittles1h@amazon.de',
      phone: '772-947-0317',
      gender: 'Polygender',
      status: 'Bị Chặn',
      joinDate: '26/11/2022',
    },
    {
      key: 55,
      name: 'Chandler',
      Gmail: 'cnowland1i@e-recht24.de',
      phone: '806-423-1499',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '3/6/2023',
    },
    {
      key: 56,
      name: 'Selena',
      Gmail: 'spickle1j@yellowbook.com',
      phone: '718-798-0330',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '1/8/2023',
    },
    {
      key: 57,
      name: 'Zita',
      Gmail: 'zluckcock1k@wordpress.org',
      phone: '652-265-0055',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '4/4/2023',
    },
    {
      key: 58,
      name: 'Tamqrah',
      Gmail: 'tcrafter1l@newyorker.com',
      phone: '808-250-6637',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '10/2/2023',
    },
    {
      key: 59,
      name: 'Gaylord',
      Gmail: 'gmassingham1m@privacy.gov.au',
      phone: '272-824-6879',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '25/5/2023',
    },
    {
      key: 60,
      name: 'Eziechiele',
      Gmail: 'ecarlon1n@narod.ru',
      phone: '445-384-2081',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '4/12/2022',
    },
    {
      key: 61,
      name: 'Arlyne',
      Gmail: 'afallen1o@bloomberg.com',
      phone: '726-310-5497',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '18/6/2023',
    },
    {
      key: 62,
      name: 'Brewer',
      Gmail: 'bghilardini1p@smugmug.com',
      phone: '741-559-6269',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '29/1/2023',
    },
    {
      key: 63,
      name: 'Ruthie',
      Gmail: 'rkolak1q@webs.com',
      phone: '563-437-6992',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '3/3/2023',
    },
    {
      key: 64,
      name: 'Danell',
      Gmail: 'dgwilt1r@hc360.com',
      phone: '379-833-0860',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '26/4/2023',
    },
    {
      key: 65,
      name: 'Pierce',
      Gmail: 'ptullett1s@microsoft.com',
      phone: '231-554-9466',
      gender: 'Polygender',
      status: 'Bị Chặn',
      joinDate: '16/7/2023',
    },
    {
      key: 66,
      name: 'Chris',
      Gmail: 'cnatte1t@theguardian.com',
      phone: '333-664-8438',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '25/2/2023',
    },
    {
      key: 67,
      name: 'Samara',
      Gmail: 'shuntall1u@cafepress.com',
      phone: '378-941-8405',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '7/12/2022',
    },
    {
      key: 68,
      name: 'Albrecht',
      Gmail: 'abucknell1v@artisteer.com',
      phone: '190-725-1648',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '1/1/2023',
    },
    {
      key: 69,
      name: 'Lynn',
      Gmail: 'lbligh1w@businesswire.com',
      phone: '371-904-2957',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '20/9/2022',
    },
    {
      key: 70,
      name: 'Karlyn',
      Gmail: 'ksheppard1x@cargocollective.com',
      phone: '112-959-7859',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '10/1/2023',
    },
    {
      key: 71,
      name: 'Scarlet',
      Gmail: 'spawelek1y@xing.com',
      phone: '812-513-7993',
      gender: 'Genderqueer',
      status: 'Hoạt Động',
      joinDate: '16/2/2023',
    },
    {
      key: 72,
      name: 'Sanders',
      Gmail: 'santhonies1z@deviantart.com',
      phone: '922-528-9320',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '10/6/2023',
    },
    {
      key: 73,
      name: 'Almire',
      Gmail: 'adimic20@ft.com',
      phone: '813-607-6651',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '11/9/2023',
    },
    {
      key: 74,
      name: 'Emelen',
      Gmail: 'echaffin21@gravatar.com',
      phone: '623-670-1402',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '16/12/2022',
    },
    {
      key: 75,
      name: 'Camey',
      Gmail: 'cwharin22@acquirethisname.com',
      phone: '189-314-8802',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '14/1/2023',
    },
    {
      key: 76,
      name: 'Georgeta',
      Gmail: 'gsecombe23@ezinearticles.com',
      phone: '803-546-2119',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '15/10/2022',
    },
    {
      key: 77,
      name: 'Kendell',
      Gmail: 'kmoizer24@nymag.com',
      phone: '468-592-8640',
      gender: 'Genderfluid',
      status: 'Hoạt Động',
      joinDate: '23/7/2023',
    },
    {
      key: 78,
      name: 'Jerrie',
      Gmail: 'jbarme25@geocities.jp',
      phone: '525-552-0913',
      gender: 'Genderqueer',
      status: 'Hoạt Động',
      joinDate: '14/7/2023',
    },
    {
      key: 79,
      name: 'Alonso',
      Gmail: 'aashton26@imdb.com',
      phone: '841-475-5282',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '4/9/2023',
    },
    {
      key: 80,
      name: 'Swen',
      Gmail: 'shainey27@eventbrite.com',
      phone: '391-968-4928',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '18/7/2023',
    },
    {
      key: 81,
      name: 'Ario',
      Gmail: 'aforst28@biglobe.ne.jp',
      phone: '527-398-5281',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '16/6/2023',
    },
    {
      key: 82,
      name: 'Mariel',
      Gmail: 'mjouannot29@seesaa.net',
      phone: '911-182-2797',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '22/5/2023',
    },
    {
      key: 83,
      name: 'Monti',
      Gmail: 'mvanschafflaer2a@ezinearticles.com',
      phone: '511-678-7985',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '2/10/2022',
    },
    {
      key: 84,
      name: 'Morgun',
      Gmail: 'mbruyns2b@ibm.com',
      phone: '122-210-8193',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '26/3/2023',
    },
    {
      key: 85,
      name: 'Anabella',
      Gmail: 'ahofton2c@wikimedia.org',
      phone: '471-870-6057',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '13/5/2023',
    },
    {
      key: 86,
      name: 'Olvan',
      Gmail: 'ostarbeck2d@symantec.com',
      phone: '907-940-7275',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '18/8/2023',
    },
    {
      key: 87,
      name: 'Leonardo',
      Gmail: 'lchidler2e@china.com.cn',
      phone: '944-350-8480',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '7/1/2023',
    },
    {
      key: 88,
      name: 'Manya',
      Gmail: 'mtidmas2f@nationalgeographic.com',
      phone: '179-723-1369',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '9/6/2023',
    },
    {
      key: 89,
      name: 'Iolanthe',
      Gmail: 'iplan2g@1und1.de',
      phone: '310-518-0054',
      gender: 'Female',
      status: 'Hoạt Động',
      joinDate: '15/4/2023',
    },
    {
      key: 90,
      name: 'Olivier',
      Gmail: 'oczadla2h@bizjournals.com',
      phone: '884-490-4555',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '22/9/2022',
    },
    {
      key: 91,
      name: 'Carney',
      Gmail: 'ccolledge2i@goo.gl',
      phone: '222-595-3270',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '9/6/2023',
    },
    {
      key: 92,
      name: 'Windham',
      Gmail: 'wgummie2j@oaic.gov.au',
      phone: '934-771-3987',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '13/8/2023',
    },
    {
      key: 93,
      name: 'Cloris',
      Gmail: 'ctilsley2k@scientificamerican.com',
      phone: '799-374-4607',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '24/12/2022',
    },
    {
      key: 94,
      name: 'Kennedy',
      Gmail: 'kchallen2l@devhub.com',
      phone: '711-365-0180',
      gender: 'Male',
      status: 'Bị Chặn',
      joinDate: '1/7/2023',
    },
    {
      key: 95,
      name: 'Fanechka',
      Gmail: 'fslowan2m@google.com.br',
      phone: '502-270-4165',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '10/9/2023',
    },
    {
      key: 96,
      name: 'Arabelle',
      Gmail: 'atesh2n@biglobe.ne.jp',
      phone: '596-875-2790',
      gender: 'Female',
      status: 'Bị Chặn',
      joinDate: '13/6/2023',
    },
    {
      key: 97,
      name: 'Lucas',
      Gmail: 'lwarhurst2o@indiatimes.com',
      phone: '682-157-8998',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '2/7/2023',
    },
    {
      key: 98,
      name: 'Karlik',
      Gmail: 'ksheekey2p@tinyurl.com',
      phone: '758-987-3080',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '28/5/2023',
    },
    {
      key: 99,
      name: 'Nealson',
      Gmail: 'nherculeson2q@hostgator.com',
      phone: '333-431-0393',
      gender: 'Male',
      status: 'Hoạt Động',
      joinDate: '14/11/2022',
    },
    {
      key: 100,
      name: 'Karly',
      Gmail: 'kbarribal2r@ezinearticles.com',
      phone: '210-441-7763',
      gender: 'Genderqueer',
      status: 'Bị Chặn',
      joinDate: '19/1/2023',
    },
  ]
  function handleFilterGender() {
    console.log('handleFilterGender')
  }
  function handleFilterStatus() {
    console.log('handleFilterStatus')
  }
  return (
    <div>
      <Head>
        <title>Admin | Provider Manager</title>
      </Head>
      <div className="h-[1000px]">
        <span className="content-title">Quản lý nhà cung cấp</span>
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center justify-between">
            <Button customCSS="px-4 py-2 m-2 bg-gray-800 rounded-xl hover:bg-gray-700" onClick={handleFilterGender}>
              Giới tính
            </Button>
            <Button customCSS="px-4 py-2 m-2 bg-gray-800 rounded-xl hover:bg-gray-700" onClick={handleFilterStatus}>
              Trạng thái
            </Button>
          </div>
          <div className="flex items-center px-3 bg-gray-800 border-2 rounded-lg">
            <Search className="bg-gray-800 rounded-full hover:bg-gray-700" theme="outline" size="24" fill="#fff" />
            <Input className="bg-gray-800 focus:outline-none" type="text" placeholder="Search " />
          </div>
        </div>
        <TableProviders data={data} />
      </div>
    </div>
  )
}

export default ProviderManager
