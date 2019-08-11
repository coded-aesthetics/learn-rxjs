import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


export const addColorOpThunk = (colorFunc: () => string) => map(x => ({ msg: x, color: colorFunc() }));

export const addColorOp = (color: string) => map(x => ({ msg: x, color }));

export const addColor = (color: string) => (obs: Observable<any>) =>
  obs.pipe(addColorOp(color));
