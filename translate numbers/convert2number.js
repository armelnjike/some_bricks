alert('c est bon!');


        // Les données
        //DONNEES INITIAUX
       
        var unite2l= ['', 'un', 'deux', 'trois', 'quatre',
                'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze',
                'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit',
                'dix-neuf'];
        var dizaine2l = ['', 'dix', 'vingt', 'trente', 'quarante',
                'cinquante' , 'soixante','', 'quatre-vingt'];
               
        //recuperation des noeuds
         var saisie = document.getElementById('nb');
         var nombre = parseInt(saisie.value,10);
         var data = saisie.value,
             para = document.createElement('p'),
             bd = document.getElementById('bob');
            // para.innerHTML = bd.childElementCount;  bd.appendChild(para);
            
             

       //            decomposition des nombre saisie en parties
       // var unite=nombre % 10, dizaine = (nombre %100 - unite)/10, centaines = (nombre%1000 - nombre%100)/100;
       
         var     u = (nombre % 10),
                 d = ((nombre % 100) - u)/10,
                 c = ((nombre %1000) - nombre % 100) / 100;

       //Ecriture des unités
       function nbsimple(n){
           
           return unite2l[n]
       }

       //Les dizaines [17,60]
       function nbcomposees(n){
           //Les dizaines
                var un = n % 10,
                    di = (n % 100 - un)/10;

                    if (n < 17){
                            return unite2l[n];
                        }
                        //nombre  de 17 à 69 et de 80 à 89
                    else{
                            //si l unité est 0
                            if (un == 0 && (di != 7 && di != 9) && di != 0){
                                return dizaine2l[di];
                            }
                            //si unité est 1
                            if(un == 1 && (di != 7 && di != 9) && di != 0){
                                return dizaine2l[di] + ' et ' + unite2l[un];
                            }
                            else if((di != 7 && di != 9) && un != 1){
                                return dizaine2l[di] + '-' + unite2l[un];
                            }
                            else if(di == 7 || di == 9){
                                    di = di - 1;
                                    un = un + 10;
                                    return dizaine2l[di] + '-' + unite2l[un];
                                }

                        }
            
                   
               }
               function lescentaines(n){
                  var ce = ((n % 1000) - (n % 100))/100,
                      di = (n % 100 - n % 10)/10,
                      un = n % 10;
                    
                      console.log(di);
                   
                    if(n < 100){
                        return nbcomposees(n % 100);
                    }
                    else{
                        if(n % 100 == 0 && n != 0){
                            if (ce > 1){
                            return unite2l[ce] + ' cents';
                            }
                            else{
                            return 'cent';
                            console.log(n%100);}
                            }
                        else if(ce == 1){
                            
                                console.log(di + '222');
                                return 'cent ' + nbcomposees(n % 100);
                        }
                        else if(ce > 1){
                            if (di != 0 || un != 0){
                
                                    return unite2l[ce] + ' cent ' + nbcomposees(n%100);
                                }
                                else{
                                    return unite2l[ce] + ' cents ' + nbcomposees(n%100);
                                }
                            }
                }}

                    //  ***********  GERER LES MILLIERS  *************
            function milliers(n){
                 var mil = (n - n % 1000)/1000;
                 if(n < 1000){
                        console.log(mil + ': voila mil');
                        return lescentaines(n);
                    }else{
                    
                    if(mil < 20){
                        if (n % 1000 < 20){
                            console.log(mil + ': voila mil');
                            return unite2l[mil] + ' mille ' + unite2l[n%1000];
                        }
                        else if(n % 1000 >= 20 && n%1000 < 100){
                            console.log(mil + ': voila mil');
                            return unite2l[mil] + ' mille ' + nbcomposees(n % 1000);
                        }
                        else{
                            console.log(mil + ': voila mil');
                            return unite2l[mil] + ' mille ' + lescentaines(n % 1000);
                        }
                        
                    
                    }
                    else if (mil >= 20 && mil < 100){
                        if (n % 1000 < 20){
                            console.log(mil + ': voila mil');
                            return nbcomposees(mil) + ' mille ' + unite2l[n%1000];
                        }
                        else if(n % 1000 >= 20 && n%1000 < 100){
                            console.log(mil + ': voila mil');
                            return nbcomposees(mil) + ' mille ' + nbcomposees(n % 1000);
                        }
                        else{
                            console.log(mil + ': voila mil');
                            return nbcomposees(mil) + ' mille ' + lescentaines(n % 1000);
                        }
                    
                    }
                    else{
                        if (n % 1000 < 20){
                            console.log(mil + ': voila mil');
                            return lescentaines(mil) + ' mille ' + unite2l[n%1000];
                        }
                        else if(n % 1000 >= 20 && n%1000 < 100){
                            console.log(mil + ': voila mil');
                            return lescentaines(mil) + ' mille ' + nbcomposees(n % 1000);
                        }
                        else{
                            console.log(mil + ': voila mil');
                            return lescentaines(mil) + ' mille ' + lescentaines(n % 1000);
                        }
                    }

                }
             }

                //   *********** LES MILLIONS *************
                function million(n){
                   
                // RETOUR AU MILLIER SI LE NOMBRE EST INFERIEUR A  UN MILLION
                    if (n < 1000000){
                        return milliers(n);
                    }else{
                        var millio = (n - n % 1000000) / 1000000;

                // NOMBRE SUP OU EGAL A UN MILLION 
                        if (millio <= 1){
                        
                            return unite2l[millio] + ' million ' + milliers(n%1000000);
                            }else{
                                return lescentaines(millio) + ' millions ' + milliers(n%1000000);
                            }
                    }
                }
                
            //  MILLIARDS
                function milliard(n){
                   
                    // RETOUR AU MILLIER SI LE NOMBRE EST INFERIEUR A  UN MILLION
                        if (n < 1000000000){
                            return million(n);
                        }else{
                            var milliar = (n - n % 1000000000) / 1000000000;
    
                    // NOMBRE SUP OU EGAL A UN MILLION 
                            if (milliar <= 1){
                            
                                return unite2l[milliar] + ' milliard ' + million(n%1000000000);
                                }else{
                                    return lescentaines(milliar) + ' milliards ' + million(n%1000000000);
                                }
                        }
                    }
                // LES BILLIONS
                    function billion(n){
                        if (n < 1000000000000){
                            return milliard(n);
                        }
                        else{
                            var billio = (n - n % 1000000000000) / 1000000000000;
                            if(billio <= 1){
                                return unite2l[billio] + ' billion ' + milliard(n%1000000000000);
                            }
                            else{
                                return lescentaines(billio) + ' billions ' + milliard(n%1000000000000);
                            }
                        }
                    }
                    
        //    ************************************************************************************
       // la capacité de calcul en 64 bit ne nous permet plus d effectuer des operation a ce niveau en separant la chaine entrer


        //   *******************************************
       //fonction de separation DE PARTIE SUP
       function suppart(chaine,longueur){
          var  chaine = saisie.value;
           return chaine.slice(0,-longueur);
       }
       //  **********************************************
       // PARTIE INFERIEUR DU NOMBRE
       function subpart(chaine,longueur){
        var  chaine = saisie.value;
        return chaine.substr(-longueur);
       }

       //   *********************************  BILLIARDS   ***************************************
        function billiar(ch){ 
            var l = 15;
           
            if (ch.length < l + 1){            //VERIFICATION DE LA LONGUEUR DE LA CHAINE SAISIE
                
                return billion(parseInt(ch,10));                    // CONVERTION ET ENVOIE A LA FONCTION BILLION
            }
            
            
            else{
                var bbillio = parseInt(suppart(ch,l),10);  //  EXTRACTION DE LA SOUS ELT CORESPONDANT AU BILLIARDS ET CONVERTION
                if(bbillio == 0 || suppart(ch,l) == ''){
                    return billion(parseInt(subpart(ch,l)));
                }
               
                else if(bbillio == 1){
                    return unite2l[bbillio] + ' billiard ' + billion(parseInt(subpart(ch,l)));
                }
                else{
                    return lescentaines(bbillio) + ' billiards ' + billion(parseInt(subpart(ch,l)));
                }
            }
        }

        //  *********************************************************************************************************
         // ********    ********  *******  **********   TRILLIONS   *******    *******        ********       ********
        function trillions(ch){
            var l = 18;                                  //NOMBRE DE 0 APRES LES TRILLIONS == LONGUEUR DE CHAINE PRECEDENTE
                   
            if (ch.length < l + 1){
                return billiar(ch);
            }
            else{
                var trillio = parseInt(suppart(ch,l),10);

                if (trillio == 0 || suppart(ch,l) == ''){
                    return billiar(subpart(ch,l));
                }
                
                else if(trillio == 1){
                    return unite2l[trillio] + ' trillion ' + billiar(subpart(ch,l));
                }
                else{
                    return lescentaines(trillio) + ' trillions ' + billiar(subpart(ch,l));
                }
            }
        }

        //trilliard
        function trilliard(ch){
            var l = 21;                                  //NOMBRE DE 0 APRES LES TRILLIardS == LONGUEUR DE CHAINE PRECEDENTE
                   
            if (ch.length < l + 1){
                return trillions(ch);
            }
            else{
                var trillia = parseInt(suppart(ch,l),10);

                if (trillia == 0 || suppart(ch,l) == ''){
                    return trillions(subpart(ch,l));
                }
                
                else if(trillia == 1){
                    return unite2l[trillia] + ' trilliard ' + trillions(subpart(ch,l));
                }
                else{
                    return lescentaines(trillia) + ' trilliards ' + trillions(subpart(ch,l));
                }
            }
        }

        //QUATRILLIONS
        function quatrillion(ch){
            var l = 24;                                  //NOMBRE DE 0 APRES LES TRILLIardS == LONGUEUR DE CHAINE PRECEDENTE
                   
            if (ch.length < l + 1){
                return trilliard(ch);
            }
            else{
                var quatril = parseInt(suppart(ch,l),10);
                console.log(suppart(ch,l));

                if (quatril == 0 || suppart(ch,l) == ''){
                    return trilliard(subpart(ch,l));
                }
                
                else if(quatril == 1){
                    return unite2l[quatril] + ' quatrillion ' + trilliard(subpart(ch,l));
                }
                else{
                    return lescentaines(quatril) + ' quatrillions ' + trilliard(subpart(ch,l));
                }
            }
        }

                function infmil(n){
                    if (nombre < 17){
                        return nbsimple(nombre);
                        //bd.appendChild(para);
                    }
                    else if(nombre > 16 && nombre < 100){
                        return nbcomposees(nombre);
                        //bd.appendChild(para);
                    }
                    else if (nombre >= 100 && nombre < 1000){
                        return lescentaines(nombre);
                        //bd.appendChild(para);
                    }
                }
      

//   *********************   DEBUT    ****************************************************************
    function convert(nombre){
        var saisie = document.getElementById('nb');
        var nombre = parseInt(saisie.value,10);
        var para = document.createElement('p'),
         bd = document.getElementById('bob');
         while(bd.childElementCount > 3){
             bd.removeChild(bd.lastElementChild);
         }
        /// debut ********************************************************************
        if(isNaN(nombre)){
            para.innerText = 'Erreur entrez un entier !!!!!!!!!!!!!!!!';
            para.style.color='red';
            bd.appendChild(para);
        }else{
        if (nombre < 17){
            if(nombre == 0){
                para.innerText = 'zéro';
                bd.appendChild(para);
            }
            else{
            para.innerText = nbsimple(nombre);
            bd.appendChild(para);
            }
        }
        else if(nombre > 16 && nombre < 100){
            para.innerText = nbcomposees(nombre);
            bd.appendChild(para);
        }
        else if (nombre >= 100 && nombre < 1000){
            para.innerText = lescentaines(nombre);
            bd.appendChild(para);
        }
        else if(nombre >= 1000 && nombre < 1000000){
            console.log(nombre,para);
            para.innerText = milliers(nombre);
            bd.appendChild(para);
        }
        else if(nombre >= 1000000 && nombre < 1000000000){
            console.log(nombre,para);
            para.innerText = million(nombre);
            bd.appendChild(para);
        }
        else if(nombre >= 1000000000 && nombre < 1000000000000){
            console.log(nombre,para);
            para.innerText = milliard(nombre);
            bd.appendChild(para);
        }
        else if(nombre >= 1000000000000 && nombre < 1000000000000000){
            console.log(nombre,para);
            para.innerText = billion(nombre);
            bd.appendChild(para);
        }
        else if(data.length >= 16 && data.length < 19){
            console.log(nombre,para);
            para.innerText = billiar(nombre);
            bd.appendChild(para);
        }
        else if(data.length >= 19 && data.length < 22){
            console.log(nombre,para);
            para.innerText = trillions(data);
            bd.appendChild(para);
        }
        else if(data.length >= 22 && data.length < 25){
            console.log(nombre,para);
            para.innerText = trilliard(data);
            bd.appendChild(para);
        }
        else if(data.length >= 25 && data.length < 28){
            console.log(nombre,para);
            para.innerText = quatrillion(data);
            bd.appendChild(para);
        }
    }

}
//**************************************************       FIN  ****************************************** 