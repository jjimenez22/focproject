/**
  * Goes through all iterations until it reaches a table with a solution
  * @param tabla - The initial table with data
  * @return An array in which each cell is an iteration represented with an object carrying the information
 **/
function Hung(tabla) {

   var Sol = function() {
      this.result = [];
      this.minvec = [];
      this.strikethrough = [];
      this.mini = -1;
      this.minj = -1;
      this.esSol = false;
      var auxArray = [];
      for (var i=0;i<tabla.length;i++) {
         for (var j=0;j<tabla.length;j++) {
            auxArray.push(false);
         }
         this.strikethrough.push(auxArray);
         auxArray = [];
      }
   };

   var solucion = [];
   var iteracion = {};

   var Max0 = function(filaOColumna=0, posicion=-1) {
      this.fc=filaOColumna;
      this.pos=posicion;
      this.cst=0;
      // this.ct=0;
      this.esMejor = function(val) {
         if (val.cst>this.cst)
            return true;
         if (val.cst<this.cst)
            return false;
         if (val.fc===1)
            return (ftach.length<ctach.length);
         return (ftach.length>ctach.length);
      };
   };

   var ftach=[];
   var ctach=[];
   /**
     * Function to see if a row or column is striked
     * @param tabla - The initial table with data
     * @return An array in which each cell is an iteration represented with an object carrying the information
    **/
   var estaTachado = function(tachados, pos) {
      var fnd=false;
      for (var i=0;i<tachados.length && !fnd;i++)
         fnd = (tachados[i].pos===pos);
      return fnd;
   };

   var minimo = function(fila) {
      var min = fila[0];
      iteracion.minvec.push(0);
      for (var i=1;i<fila.length;i++) {
         if (fila[i]<min) {
            min=fila[i];
            iteracion.minvec[iteracion.minvec.length-1]=i;
         }
      }
      return min;
   };

   var columnMin = function(j) {
      var min=tabla[0][j];
      iteracion.minvec.push(0);

      for (var i=1;i<tabla.length;i++) {
         if (min===0)
            return 0;
         if (tabla[i][j]<min) {
            min = tabla[i][j];
            iteracion.minvec[iteracion.minvec.length-1]=i;
         }
      }
      return min;
   };

   /**
     * Goes through the two firsts iterations
    **/
    var costosReducidos = function() {
      var min;
      iteracion = new Sol();
      for (var i=0;i<tabla.length;i++) {
         min=minimo(tabla[i]);
         for (var j=0;j<tabla[i].length;j++) {
            tabla[i][j] -= min;
         }
      }
      iteracion.result = angular.copy(tabla);
      solucion.push(iteracion);

      iteracion = new Sol();
      for (var j=0;j<tabla.length;j++) {
         min=columnMin(j);
         if (min===0)
            continue;
         for (var i=0;i<tabla.length;i++) {
            tabla[i][j] -= min;
         }
      }
      iteracion.result = angular.copy(tabla);
      solucion.push(iteracion);
   };

   var valMax0 = function(mode) {
      var maxVal = new Max0();
      var val = {};//objeto
      for (var i=0;i<tabla.length;i++) {
         if (estaTachado((mode?ftach:ctach), i))
            continue;
         val = new Max0((mode?1:2), i);
         for (var j=0;j<tabla.length;j++) {
            if (tabla[mode?i:j][mode?j:i]===0)
               if (!estaTachado((mode?ctach:ftach), j)) {
                  val.cst++;
               }
         }
         if (maxVal.esMejor(val))
            maxVal=val;
      }
      return maxVal;
   };

   var hay0sinTachar = function() {
      for (var i=0;i<tabla.length;i++) {
         if (estaTachado(ftach, i))
            continue;
         for (var j=0;j<tabla.length;j++)
            if (tabla[i][j]===0 && !estaTachado(ctach, j))
               return true;
      }
      return false;
   };

   /**
     * Strikes all zeros using the minimun amount of lines
    **/
    var tachar = function() {
      ftach=[];
      ctach=[];

      while (hay0sinTachar()) {
         var ft = valMax0(true);
         var ct = valMax0(false);

         if (ft.esMejor(ct)) {
            ctach.push(ct);
         } else {
            ftach.push(ft);
         }
      }
   };

   /**
     * checks if the algorithm is done
     * @return true if is done, false otherwise
    **/
    var esSol = function() {
      tachar();
      return (ftach.length+ctach.length>=tabla.length);
   };

   var menorNoTachado = function() {
      var elem = 20000000;
      for (var i=0;i<tabla.length;i++) {
         if (estaTachado(ftach, i))
            continue;
         for (var j=0;j<tabla.length;j++)
            if (!estaTachado(ctach, j) && tabla[i][j]<elem) {
               elem = tabla[i][j];
               iteracion.mini=i;
               iteracion.minj=j;
            }
      }
      return elem;
   };

   /**
     * Substract an element from each cell not striked, and adds it to each cell striked twice
     * @param elem - The element which is going to be substracted and added
    **/
    var restarNoTachados = function(elem) {
      var ti=false;
      var tj=false;
      for (var i=0;i<tabla.length;i++) {
         ti = estaTachado(ftach, i);
         for (var j=0;j<tabla.length;j++) {
            tj = estaTachado(ctach, j);
            iteracion.strikethrough[i][j] = (ti || tj);
            if (ti&&tj) {
               tabla[i][j] += elem;
            } else if (!ti && !tj)
               tabla[i][j] -= elem;
         }
      }
   };
   costosReducidos();
   while (!esSol()) {
      iteracion = new Sol();
      restarNoTachados(menorNoTachado());
      iteracion.result = angular.copy(tabla);
      solucion.push(iteracion);
   }
   solucion[solucion.length-1].esSol=true;
   return solucion;
}

/**
 * Determines the resulting elements used in function Z.
 * @param tabla - Final table
 * @return Indexes of the original table's cells that are used to calculate Z function.
 */
function resolver(tabla) {
   var sol=[];

   var returnType = function(indexi, indexj) {
         this.i=indexi;
         this.j=indexj;
      };

   var estai = function(ind) {
      var fnd=false;
      for (var i=0;i<sol.length && !fnd;i++) {
         fnd=(sol[i].i===ind);
      }
      return fnd;
   };

   var estaj = function(ind) {
      var fnd=false;
      for (var i=0;i<sol.length && !fnd;i++) {
         fnd=(sol[i].j===ind);
      }
      return fnd;
   };

   /**
     * finds a one-zero row
     * @return object carrying the indexes of the one zero or -1 if not found
    **/
   var ceroUnico = function() {
      var i0;
      var j0;
      var minj0;
      var counter;
      var mincont=2000000;
      var found = false;

      for (var i=0;i<tabla.length && !found; i++) {
         if (estai(i))
            continue;
         counter=0;
         // iterate the row looking for a one-zero-row
         for (var j=0;j<tabla.length;j++) {
            if (tabla[i][j]===0 && !estaj(j)) {
               counter++;
               j0=j;
            }
         }
         // found a one-zero-row?
         if (counter == 1) {
            i0=i;
            minj0=j0;
            found = true;
            return new returnType(i0, minj0);
         }
      }
      return new returnType(-1, -1)
   };
   var res;
   for ( var i=0;i<tabla.length;i++) {
     res = ceroUnico();
     if (res.i != -1 || res.j != -1)
      sol.push(angular.copy(res));
   }
   return sol;
}

/**
 * Solves the Z function
 * @param sol - Indexes of the original table's cells that are used to calculate Z function.
 * @param tabla - Original table.
 * @return Result of solving Z.
 */
function resultado(sol, tabla) {
   var acc=0;
   for (var i=0;i<sol.length;i++)
      acc += tabla[sol[i].i][sol[i].j];
   return acc;
}
