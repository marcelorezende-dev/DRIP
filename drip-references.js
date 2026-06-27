/* ============================================================================
   DRIP – canonical APA reference library (single source of truth)
   ----------------------------------------------------------------------------
   APA (7th ed.) entries for the source documents behind DRIP knowledge
   products. Every page cites from THIS file so a given work reads identically
   everywhere and is maintained in one place.

   To reference on a page:
     1) load it:    <script src="drip-references.js"></script>
     2) add a list: <ol class="apa-refs" data-refs="mapa-2015 wocat-2019"></ol>
                    (space- or comma-separated keys; renders alphabetically)
     3) cite inline using the entry's `intext` label, e.g. (MAPA, 2015)
   `.apa-refs` styling lives in the shared stylesheets (drip-manual.css, etc.).

   Years: confirmed from PDF metadata or the document itself where possible.
   ‹⚠ confirm› marks an established/published year still to be verified in-file.
   ============================================================================ */
window.DRIP_REFS = {
  'araujo-filho-2013': { sort:'Araujo Filho 2013', intext:'Araújo Filho, 2013', // ‹⚠ confirm year›
    apa:'Araújo Filho, J. A. de. (2013). <em>Manejo pastoril sustentável da Caatinga</em>. Projeto Dom Helder Câmara. <a class="inl" href="resources/caatinga/Caatinga-Manejo-Pastoril-Sustentavel-Araujo-Filho-MMA.pdf" target="_blank" rel="noopener">PDF</a>' },
  'brasil-2003': { sort:'Brasil 2003', intext:'Brasil, 2003',
    apa:'Brasil. (2003). <em>Lei nº 10.831, de 23 de dezembro de 2003: Dispõe sobre a agricultura orgânica e dá outras providências</em>. Diário Oficial da União.' },
  'fao-drip-2026': { sort:'Food and Agriculture 2026', intext:'FAO, 2026',
    apa:'Food and Agriculture Organization of the United Nations [FAO]. (2026). <em>Drylands Restoration Initiatives Platform: Caatinga knowledge products</em>. DRIP. <a class="inl" href="Caatinga Biome.html">Caatinga biome</a>; <a class="inl" href="DRIP Manual 03 - Caatinga Value Chains.html">Manual 03</a>.' },
  'leal-2003': { sort:'Leal 2003', intext:'Leal et al., 2003',
    apa:'Leal, I. R., Tabarelli, M., &amp; Silva, J. M. C. da (Eds.). (2003). <em>Ecologia e conservação da Caatinga</em>. Editora Universitária da UFPE. <a class="inl" href="resources/caatinga/Ecologia-e-Conservacao-da-Caatinga-Leal-Tabarelli-Silva.pdf" target="_blank" rel="noopener">PDF</a>' },
  'mapa-2015': { sort:'Ministerio da Agricultura 2015', intext:'MAPA, 2015',
    apa:'Ministério da Agricultura, Pecuária e Abastecimento [MAPA]. (2015). <em>Cadernos de boas práticas para o extrativismo sustentável orgânico: Carnaúba, caroá e licuri</em>. MAPA. <a class="inl" href="resources/caatinga/Boas-Praticas-Extrativismo-Sustentavel-Carnauba-MAPA.pdf" target="_blank" rel="noopener">Carnaúba</a> · <a class="inl" href="resources/caatinga/Boas-Praticas-Extrativismo-Sustentavel-Caroa-MAPA.pdf" target="_blank" rel="noopener">Caroá</a> · <a class="inl" href="resources/caatinga/Boas-Praticas-Extrativismo-Sustentavel-Licuri-MAPA.pdf" target="_blank" rel="noopener">Licuri</a>' },
  'mma-atlas-2007': { sort:'Ministerio do Meio Ambiente 2007', intext:'MMA, 2007',
    apa:'Ministério do Meio Ambiente [MMA]. (2007). <em>Atlas das áreas susceptíveis à desertificação do Brasil</em>. MMA. <a class="inl" href="resources/caatinga/Atlas-Areas-Susceptiveis-Desertificacao-Brasil-MMA-2007.pdf" target="_blank" rel="noopener">PDF</a>' },
  'mma-pnf-2008': { sort:'Ministerio do Meio Ambiente 2008', intext:'MMA, 2008',
    apa:'Ministério do Meio Ambiente [MMA]. (2008). <em>Estatística florestal da Caatinga</em> (Programa Nacional de Florestas). MMA. <a class="inl" href="resources/caatinga/Caatinga-Estatistica-Florestal-MMA-PNF.pdf" target="_blank" rel="noopener">PDF</a>' },
  'mma-pmfcf-2011': { sort:'Ministerio do Meio Ambiente 2011', intext:'MMA, 2011',
    apa:'Ministério do Meio Ambiente [MMA]. (2011). <em>Plano anual de manejo florestal comunitário e familiar da Caatinga</em>. MMA. <a class="inl" href="resources/caatinga/Caatinga-Plano-Anual-Manejo-Florestal-Comunitario-Familiar-2011-MMA.pdf" target="_blank" rel="noopener">PDF</a>' },
  'wocat-2019': { sort:'World Overview 2019', intext:'WOCAT, 2019',
    apa:'World Overview of Conservation Approaches and Technologies [WOCAT]. (2019). <em>Questionnaire on sustainable land management technologies</em>. WOCAT. <a class="inl" href="https://qcat.wocat.net" target="_blank" rel="noopener">https://qcat.wocat.net</a>' }
};
(function(){
  function render(){
    var lib = window.DRIP_REFS || {};
    document.querySelectorAll('[data-refs]').forEach(function(el){
      var keys = (el.getAttribute('data-refs') || '').split(/[\s,]+/).filter(Boolean);
      var seen = {}, picked = [];
      keys.forEach(function(k){ if(lib[k] && !seen[k]){ seen[k] = 1; picked.push(lib[k]); } });
      picked.sort(function(a,b){ return (a.sort || a.apa).localeCompare(b.sort || b.apa); });
      el.innerHTML = picked.map(function(r){ return '<li>' + r.apa + '</li>'; }).join('');
      var missing = keys.filter(function(k){ return !lib[k]; });
      if(missing.length && window.console) console.warn('[drip-references] unknown key(s):', missing.join(', '));
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
