import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number = 50,
    useEllipsis: boolean = true,
    preserveWords: boolean = true
  ): string {
    if (value.length <= maxLength) {
      return value;
    }

    let truncated = value.substring(0, maxLength);

    if (preserveWords) {
      truncated = truncated.substr(0, truncated.lastIndexOf(' '));
    }

    if (useEllipsis) {
      truncated += '...';
    }

    return truncated;
  }
}
