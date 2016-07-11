function Hung(tabla) {

   var Max0 = function(filaOColumna=0, posicion=-1) {
      this.fc=filaOColumna;
      this.pos=posicion;
      this.cst=0;
      this.ct=0;
      this.esMejor = function(val) {
         if (val.cst>this.cst)
            return true;
         if (val.cst<this.cst)
            return false;
         return (val.ct>this.ct);
      };
   };

   var ftach=[];
   var ctach=[];
   var estaTachado = function(tachados, pos) {
      var fnd=false;
      for (var i=0;i<tachados.length && !fnd;i++)
         fnd = (tachados[i].pos===pos);
      return fnd;
   };

   var minimo = function(fila) {
      var min = fila[0];
      for (var i=1;i<fila.length;i++) {
         if (fila[i]<min)
            min=fila[i];
      }
      return min;
   };

   var columnMin = function(j) {
      var min=tabla[0][j];

      for (var i=1;i<tabla.length;i++) {
         if (tabla[i][j]<min)
            min = tabla[i][j];
      }
      return min;
   };

   var costosReducidos = function() {
      var min;
      for (var i=0;i<tabla.length;i++) {
         min=minimo(tabla[i]);
         for (var j=0;j<tabla[i].length;j++) {
            tabla[i][j] -= min;
         }
      }
      for (var j=0;j<tabla.length;j++) {
         min=columnMin(j);
         for (var i=0;i<tabla.length;i++) {
            tabla[i][j] -= min;
         }
      }
   };

   var valMax0 = function(mode) {
      var maxVal = new Max0();
      var val = {};//objeto
      for (var i=0;i<tabla.length;i++) {
         if (estaTachado((mode?ftach:ctach), i))
            continue;
         val = new Max0(1, i);
         for (var j=0;j<tabla.length;j++) {
            if (tabla[mode?i:j][mode?j:i]===0)
               if (estaTachado((mode?ctach:ftach), i)) {
                  val.ct++;
               } else {
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
   }

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

   var esSol = function() {
      tachar();
      return (ftach.length+ctach.length>=tabla.length);
   };

   var menorNoTachado = function() {
      elem = 20000000;
      for (var i=0;i<tabla.length;i++) {
         if (estaTachado(ftach, i))
            continue;
         for (var j=0;j<tabla.length;j++)
            if (!estaTachado(ctach, j) && tabla[i][j]<elem)
               elem = tabla[i][j];
      }
      return elem;
   }

   var restarNoTachados = function(elem) {
      var ti=false;
      var tj=false;
      for (var i=0;i<tabla.length;i++) {
         ti = estaTachado(ftach, i);
         for (var j=0;j<tabla.length;j++) {
            tj = estaTachado(ctach, j);
            if (ti&&tj) {
               tabla[i][j] += elem;
            } else if (!ti && !tj)
               tabla[i][j] -= elem;
         }
      }
   }

   costosReducidos();
   while (!esSol()) {
      restarNoTachados(menorNoTachado());
   }
}
