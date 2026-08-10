import { projectName } from './constants.js';

// Construct title in the pages
let title = document.getElementsByTagName('title')[0];
title.innerHTML = projectName+' - '+title.innerHTML;