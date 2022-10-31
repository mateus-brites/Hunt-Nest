export class ControlKeyword {
  minOfKeyword(min: number, word: string): boolean {
    if (word.length < min) {
      return false;
    } else {
      return true;
    }
  }

  maxOfKeyWord(max: number, word: string): boolean {
    if (word.length > max) {
      return false;
    } else {
      return true;
    }
  }

  ContainsSpecialCharacter(word: string): boolean {
    const regex = /\W|_/;
    if (regex.test(word)) {
      return true;
    } else {
      return false;
    }
  }

  ContainsNumber(word: string): boolean {
    const regex = /\d+/g;

    if (regex.test(word)) {
      return true;
    } else {
      return false;
    }
  }

  ContainsUppercase(word: string): boolean {
    const regex = /[A-Z]/;
    if (regex.test(word)) {
      return true;
    } else {
      return false;
    }
  }

  ContainsLowcase(word: string): boolean {
    const regex = /[a-z]/;
    if (regex.test(word)) {
      return true;
    } else {
      return false;
    }
  }
}
