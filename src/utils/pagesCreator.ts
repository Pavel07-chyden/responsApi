

export const creatorPages = (pages: Array<number>, pagesCount: number, currentPage: number) => {
   // debugger
   let newpages: any = []
   if (pagesCount > 10) {
      if (currentPage > 5) {
         for (let i = currentPage - 4; i <= currentPage + 5; i++) {
            newpages.push(i)
            if (i === pagesCount) break
         }
      }
      else {
         for (let i = 1; i <= 10; i++) {
            newpages.push(i)
            if (i === pagesCount) break
         }
      }
   } else {
      for (let i = 1; i <= pagesCount; i++) {
         newpages.push(i)

      }
   }

   return newpages;
}