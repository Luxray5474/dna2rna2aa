#!/usr/bin/env node

var dna = process.argv[2].split("");
var mRNA = [], aa = [], aco = [];

var transCribeLate = function(iBs, oBs, iBa, outArr) {
  for(z=0;z<oBs.length;z++) if(iBs[z].includes(iBa)) outArr.push(oBs[z]);
}

if(dna.length % 3 == 0) {
  var i, j, tempArr;

  for(i=0;i<dna.length;i++) transCribeLate([["G","g"],["T","t"],["A","a"],["C","c"]], ["C","A","U","G"], dna[i], mRNA);

  console.log("mRNA output:");
  console.log(mRNA.join(""));

  console.log("\nCodon, anti-codon and Amino Acid output:\n\ncod aco aa\n---+---+---------");
  for(i=0,j=mRNA.length; i<j; i+=3) {
    tempArr = mRNA.slice(i,i+3);

    for(k=0;k<3;k++) transCribeLate([["G"],["U"],["A"],["C"]], ["C","A","U","G"], tempArr[k], aco);
    
    transCribeLate([
      ["GCC","GCU","GCA","GCG"],//             Ala
      ["AGA","AGG","CGA","CGG","CGU","CGC"],// Arg
      ["GAC","GAU"],["AAC","AAU"],//           Asp, Asn
      ["UGC","UGU"],["GAA","GAG"],//           Cys, Glu
      ["CAA","CAG"],//                         Gln
      ["GGA","GGG","GGC","GGU"],//             Gly
      ["CAC","CAU"],["AUA","AUC","AUU"],//     His, Ile
      ["UUA","UUG","CUA","CUG","CUU","CUC"],// Leu
      ["AAA","AAG",],["AUG"],["UUC","UUU"],//  Lys, Met START, Phe
      ["CCA","CCG","CCU","CCC"],//             Pro
      ["AGC","AGU","UCA","UCG","UCC","UCU"],// Ser
      ["ACA","ACG","ACU"],//                   Thr
      ["UGG"],["UAC","UAU"],//                 Trp
      ["GUA","GUG","GUC","GUU"],//             Tyr
      ["UAG"],["UAA"],["UGA"]//                Amb STOP, Och STOP, Opa STOP
    ], [
      "Ala","Arg","Asp","Asn","Cys",
      "Glu","Gln","Gly","His","Ile",
      "Leu","Lys","Met START","Phe","Pro",
      "Ser","Thr","Trp","Tyr","Val",
      "Amb STOP", "Och STOP", "Opa STOP" 
    ], tempArr.join(""), aa);
    
    console.log(`${tempArr.join("")} ${aco.join("")} ${aa.join("")}`);
    aco=[];
    aa=[];
  }
} else console.log("Input must be divisible by three!");