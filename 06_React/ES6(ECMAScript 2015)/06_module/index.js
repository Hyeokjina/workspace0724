//utils에서 작성한 기능을 import해서 사용가능

import {add, pi} from'./utils.js';
import helloFunc from './utils.js';


console.log("2+3 =", add(2,3));
console.log("pi = ", pi);

helloFunc("문혁진");
