(function () {

  window.Piechart = function (args) {
    this.items = [];
    this.datas = [];
    this.colors = [];
    this.container  = '';
    if (args) {
      this.init(args);
    } else {
      console.log('cant create piechart without specifying items');
    }
  }

  Piechart.prototype = {
    init : function (args) {
      this.items = [];
      this.datas = [];
      for (var field in args) {
        this.items.push(field);
        this.datas.push(args[field]);
      }
    },
    draw : function (container, outter, inner, colors) {
      this.container = container;
      this.colors = colors;
      var html = '<div class="piechart-outer"><ul>' +
                 '<li class="piechart-item piechart-overhalf">' +
                 '<span class="piechart-filled"></span></li>';
      for (var i = 0; i <= this.items.length; i++) {
        html += '<li class="piechart-item piechart-' + this.items[i] + '">' + 
                '<span class="piechart-filled"></span></li>';
      }
      html += '</ul></div><div class="piechart-inner"></div>';
      $(container).html(html);
      if (outter) {
        $(container).width(outter).height(outter);
        $(container).find('.piechart-outer').width(outter).height(outter);
        $(container).find('.piechart-item').width(outter).height(outter).css(
          'clip', 'rect(0px ' + outter + 'px ' + outter + 'px ' + outter / 2 + 'px)'
        );
        $(container).find('.piechart-filled').width(outter).height(outter).css(
          'clip', 'rect(0px ' + outter / 2 + 'px ' + outter + 'px 0px)'
        );
        $(container).find('.piechart-overhalf').css(
          'clip', 'rect(0px ' + outter + 'px ' + outter + 'px ' + outter / 2 + 'px)'
        );
      }
      if (inner) {
        $(container).find('.piechart-inner').width(inner).height(inner).css(
          'margin','' + (-1 * (inner + (outter - inner) / 2)) + 'px auto 0 auto'
        );
      }
      this.update();
    },
    update : function (args) {
      if (args) {
        this.init(args);
      }
      var taken = 0;
      var overhalf = false;
      for (var i = 0; i < this.datas.length; i++) {
        if (this.datas[i] > 0.5) {
          $(this.container).find('.piechart-overhalf').css({
            '-webkit-transform' : 'rotate(' + (360 * taken) + 'deg)',
            '-moz-transform' : 'rotate(' + (360 * taken) + 'deg)',
            '-o-transform' : 'rotate(' + (360 * taken) + 'deg)',
            'transform' : 'rotate(' + (360 * taken) + 'deg)'
          }).show();
          taken += 0.5;
          this.datas[i] -= 0.5;
          overhalf = true;
        }
        $(this.container).find('.piechart-' + this.items[i]).css({
          '-webkit-transform' : 'rotate(' + (360 * taken) + 'deg)',
          '-moz-transform' : 'rotate(' + (360 * taken) + 'deg)',
          '-o-transform' : 'rotate(' + (360 * taken) + 'deg)',
          'transform' : 'rotate(' + (360 * taken) + 'deg)'
        });
        $(this.container).find('.piechart-' + this.items[i]).children('.piechart-filled').css({
          '-webkit-transform' : 'rotate(' + (360 * this.datas[i]) + 'deg)',
          '-moz-transform' : 'rotate(' + (360 * this.datas[i]) + 'deg)',
          '-o-transform' : 'rotate(' + (360 * this.datas[i]) + 'deg)',
          'transform' : 'rotate(' + (360 * this.datas[i]) + 'deg)',
          'background' : this.colors[i]
        });
        if (overhalf) {
          $(this.container).find('.piechart-overhalf').css('background', this.colors[i]);
          overhalf = false;
        }
        taken += this.datas[i];
      }
      console.log(taken);
    }
  }

  var p = new Piechart({
    photos: 0.45,
    musics: 0.45,
    apps: 0.05,
    videoes: 0.05
  });
  p.draw('#piechart', 300, 100, ['#28aee8', '#fa2e56', '#5855af', '#fddc41', '#3a3f42']);

  var p1 = new Piechart({
    test0: 0.45,
    test1: 0.45
  });
  p1.draw('#piechart1', 500, 200, ['#f00', '#0f0', '#3a3f42']);

  var p3 = new Piechart({
    test9: 0.3,
    test8: 0.1,
    test7: 0.5
  });
  p3.draw('#piechart2', 400, 0, ['#ff0', '#0ff', '#f0f', '#3a3f42']);

})();