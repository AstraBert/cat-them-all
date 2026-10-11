import { ImageSource } from 'expo-image';

export interface CatDefinition {
  /** Stable identifier, also used as the asset key stored in SQLite. */
  id: string;
  name: string;
  /** Short lore blurb shown on the cat's card. */
  meme: string;
  /** A funny line shown when the cat is caught. */
  funnyLine: string;
  /** Bundled image asset. */
  image: ImageSource;
}

/**
 * The 20 collectible cats. Asset paths are bundled via `require` so Metro packs
 * them into the app; the SQLite catalog stores the same `id` as the
 * canonical asset path reference.
 *
 * Note: Assets are named cat-00.jpg through cat-19.jpg to match the
 * bundled files in assets/cats/.
 */
export const CATS: CatDefinition[] = [
  {
    id: 'black-cat',
    name: 'Amelia',
    meme: 'A paw-erful sorceress, she only comes out at night',
    funnyLine: 'She abandoned black magic a while ago, and now is creating the purr-fect potion to make her fellow cats live longer.',
    image: require('@/assets/cats/cat-00.jpg'),
  },
  {
    id: 'couch-cat',
    name: 'Michael',
    meme: 'The stereotypical gray cat, mysterious and with deep eyes.',
    funnyLine: 'He is irresistible and gets all the cats (and human) ladies.',
    image: require('@/assets/cats/cat-01.jpg'),
  },
  {
    id: 'loafing-cat',
    name: 'Arthur',
    meme: 'Named after the brave King of England, he is actually a very shy and scaredy cat',
    funnyLine: 'His loafing powers are unmeasured, sometimes he can even get mistaken for a burn loaf of bread',
    image: require('@/assets/cats/cat-02.jpg'),
  },
  {
    id: 'orange-cat',
    name: 'Thalia',
    meme: 'A rare orange-and-white cat, it is believed she was a princess on a faraway planet',
    funnyLine: 'Her alien senses can locate a meal from kilometers away.',
    image: require('@/assets/cats/cat-03.jpg'),
  },
  {
    id: 'white-spotted-cat',
    name: 'Ethan',
    meme: 'A French gentleman artist who lives off of small gigs in the underground art scene of Paris.',
    funnyLine: 'You may find him in your basement trying to make sculptures with hairballs.',
    image: require('@/assets/cats/cat-04.jpg'),
  },
  {
    id: 'multicolor-cat',
    name: 'Amber',
    meme: 'She is a secret agent for the cat paw-lice, on a mission to get more treats from humans.',
    funnyLine: 'She is a Karate black belt, better not make her mad!',
    image: require('@/assets/cats/cat-05.jpg'),
  },
  {
    id: 'jailed-cat',
    name: 'Ernesto',
    meme: 'He once orchestrated a robbery to a cat food factory, and is behind bars for that.',
    funnyLine: 'He might try to corrupt you with his irresistible cuteness.',
    image: require('@/assets/cats/cat-06.jpg'),
  },
  {
    id: 'yellow-cat',
    name: 'Patricia',
    meme: 'Also known as Science Cat. Tells puns periodically.',
    funnyLine: 'It asked if you are made of copper and tellurium, because you are Cu-Te.',
    image: require('@/assets/cats/cat-07.jpg'),
  },
  {
    id: 'ghost-kitten',
    name: 'Bianca',
    meme: 'A tiny white ghost hunter. Unfortunately, she is also terrified of ghosts.',
    funnyLine: 'She puffed up to twice her size when you caught her. It did not help.',
    image: require('@/assets/cats/cat-08.jpg'),
  },
  {
    id: 'dangling-cat',
    name: 'Walter',
    meme: 'A gray acrobat who only performs when held up by a human assistant.',
    funnyLine: 'He hung there dramatically until you offered him a better gig.',
    image: require('@/assets/cats/cat-09.jpg'),
  },
  {
    id: 'purple-bed-kitten',
    name: 'Luna',
    meme: 'A small tabby princess who refuses to sleep anywhere but purple sheets.',
    funnyLine: 'She was guarding her toy bravely. Now she guards your collection.',
    image: require('@/assets/cats/cat-10.jpg'),
  },
  {
    id: 'judgmental-cat',
    name: 'Sebastian',
    meme: 'A Siamese aristocrat with icy blue eyes and even icier opinions.',
    funnyLine: 'He judged your catching form harshly, but accepted the outcome.',
    image: require('@/assets/cats/cat-11.jpg'),
  },
  {
    id: 'laundry-cat',
    name: 'Margaret',
    meme: 'A fluffy laundress who raises her kittens in the warmest basket in the house.',
    funnyLine: 'She was caught mid-spin cycle. The kitten supervised.',
    image: require('@/assets/cats/cat-12.jpg'),
  },
  {
    id: 'standing-cat',
    name: 'Clementine',
    meme: 'A tall orange tower of a cat. Some say she never actually sits down.',
    funnyLine: 'She stood her ground heroically. Then she stood into your collection.',
    image: require('@/assets/cats/cat-13.jpg'),
  },
  {
    id: 'sleepy-tabby',
    name: 'Oliver',
    meme: 'A professional napper, currently in the semifinals of the National Sleeping Championship.',
    funnyLine: 'He slept through the entire capture. A new personal record.',
    image: require('@/assets/cats/cat-14.jpg'),
  },
  {
    id: 'sploot-cat',
    name: 'Ginger',
    meme: 'An orange yogi who has perfected the ancient art of the full-body sploot.',
    funnyLine: 'She was already lying flat, so catching her felt a bit like cheating.',
    image: require('@/assets/cats/cat-15.jpg'),
  },
  {
    id: 'crouching-cat',
    name: 'Felix',
    meme: 'A striped ninja in eternal stealth mode. The wiggle before the pounce is mandatory.',
    funnyLine: 'He was about to pounce. You pounced first. He respects that.',
    image: require('@/assets/cats/cat-16.jpg'),
  },
  {
    id: 'fancy-calico',
    name: 'Duchess',
    meme: 'A calico lady of high society. The collar is real gold, or so she claims.',
    funnyLine: 'She allowed you to catch her, as long as you bowed first.',
    image: require('@/assets/cats/cat-17.jpg'),
  },
  {
    id: 'tuxedo-cat',
    name: 'Alfred',
    meme: 'A tuxedo-wearing butler cat with piercing green eyes. Always at your service, mostly.',
    funnyLine: 'He was caught with impeccable manners and then judged your outfit.',
    image: require('@/assets/cats/cat-18.jpg'),
  },
  {
    id: 'adventure-kitten',
    name: 'Pip',
    meme: 'A tiny explorer of the great outdoors. Every rock is a mountain, every bug a dragon.',
    funnyLine: 'He was caught mid-expedition. The summit will have to wait.',
    image: require('@/assets/cats/cat-19.jpg'),
  },
];

export const TOTAL_CATS = CATS.length;

export function getCatById(id: string): CatDefinition | undefined {
  return CATS.find((cat) => cat.id === id);
}
