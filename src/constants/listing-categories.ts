import beach from '@/../public/images/categories/beach.png';
import room from '@/../public/images/categories/bed.png';
import boat from '@/../public/images/categories/boat.png';
import castle from '@/../public/images/categories/castle.png';
import coffee from '@/../public/images/categories/coffee.png';
import fire from '@/../public/images/categories/fire.png';
import golf from '@/../public/images/categories/golf.png';
import house from '@/../public/images/categories/house.png';
import pool from '@/../public/images/categories/pool.png';
import ufo from '@/../public/images/categories/ufo.png';
import view from '@/../public/images/categories/view.png';
import bowling from '../../public/images/categories/bowling.png';
import cabin from '../../public/images/categories/cabin.png';
import tower from '../../public/images/categories/tower.png';

import { TListingCategory } from '@/common/types';
import { StaticImageData } from 'next/image';

const LISTING_CATEGORIES: {
	title: TListingCategory;
	image: StaticImageData;
}[] = [
	{ title: 'Trending', image: fire },
	{ title: 'Amazing views', image: view },
	{ title: 'Tiny homes', image: house },
	{ title: 'OMG!', image: ufo },
	{ title: 'Golfing', image: golf },
	{ title: 'Private rooms', image: room },
	{ title: 'Beachfront', image: beach },
	{ title: 'Boats', image: boat },
	{ title: 'Amazing pools', image: pool },
	{ title: 'Bed and breakfast', image: coffee },
	{ title: 'Castles', image: castle },
	{ title: 'Bowling', image: bowling },
	{ title: 'Cabins', image: cabin },
	{ title: 'Towers', image: tower },
];

export default LISTING_CATEGORIES;
