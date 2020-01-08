$(document).ready(function () {
    var rows = 10;
    var cols = 10;
    
    var grid = '<div class="grid">';
    for (var i = 0; i < rows; i++) {
        grid += '<div class="roW">';
        for (var c = 0; c < cols; c++) {
            grid += '<div class="square"><div class="inner"></div></div>';    
        }
        grid += '</div>';
    }
    grid += '</div>';
    
    var $gridChooser = $('.grid-chooser');
    var $grid = $(grid)
        .height(rows * 24)
        .width(cols * 24) 
     .insertAfter($gridChooser)
    $grid.find('.roW').css({
        height: 'calc(100%/'+rows+')',
        'margin-left': '0px',
    })
        $grid.find('.square').css({
        width: 'calc(100%/'+cols+')'
    })

    var $allSquares = $('.square');
    
    $grid.on('mouseover', '.square', function () {
        var $this = $(this);
        var col = $this.index() + 1;
        var row = $this.parent().index() + 1;
        $allSquares.removeClass('highlight');
        $('.roW:nth-child(-n+'+row+') .square:nth-child(-n+'+col+')')
            .addClass('highlight');
         $gridChooser.val(col + ' x ' + row);
         $("#number_col").val(col);
         $("#number_row").val(row);
    })
    // meeeeeeeeeeeeeee
    absoluteDrag();

    $.contextMenu({
        selector: '#test',
        callback: function(key, options) {
            if(key=='paste'){
                var type = $("#test").attr('data-type');
                if (type == 'obj'){
                    $(".context-menu-list").each(function () {
                        if ($(this).css("display") !== "none") { 
                            var data_id = $("#test").attr('data-id');
                            var childPos = $(this).offset();
                            var parentPos = $("#test").offset();
                            var childOffset = {
                                top: childPos.top - parentPos.top,
                                left: childPos.left - parentPos.left,
                            }
                            var obj = $(".div_table[data-type=obj]").eq(data_id).clone();
                            obj.children(".ui-resizable-handle").remove();
                            obj.mouseover(function(){
                                $(this).css({
                                    border: '2px solid blue'
                                });
                            }).mouseout(function(){
                                $(this).css({
                                    border: '1px solid black'
                                });
                            });
                            obj.draggable({
                                containment: '#test',
                                cursor: 'move',
                                snap: "#test,.div_table",
                                grid: [ 10, 10 ],
                                drag: function() {
                                    $(this).find($('.topline')).css('display', 'block');
                                    $(this).find($('.rightline')).css('display', 'block');
                                    $(this).find($('.botline')).css('display', 'block');
                                    $(this).find($('.leftline')).css('display', 'block');
                                },
                                start: function() {
                                    $(this).find($('.topline')).css('display', 'block');
                                    $(this).find($('.rightline')).css('display', 'block');
                                    $(this).find($('.botline')).css('display', 'block');
                                    $(this).find($('.leftline')).css('display', 'block');
                                },
                                stop: function() {
                                    $(this).find($('.topline')).css('display', 'none');
                                    $(this).find($('.rightline')).css('display', 'none');
                                    $(this).find($('.botline')).css('display', 'none');
                                    $(this).find($('.leftline')).css('display', 'none');
                                }
                            }).resizable();
                            obj.css({
                                top: Math.round(childOffset.top/10) * 10,
                                left: Math.round(childOffset.left/10)*10,
                            }).appendTo($("#test"));
                            absoluteDrag();
                        }
                    })
                }
                if (type == 'seat'){
                    $(".context-menu-list").each(function () {
                        if ($(this).css("display") !== "none") { 
                            var data_id = $("#test").attr('data-id');
                            var childPos = $(this).offset();
                            var parentPos = $("#test").offset();
                            var childOffset = {
                                top: childPos.top - parentPos.top,
                                left: childPos.left - parentPos.left,
                            }
                            var obj = $('table[data-type=seat][data-id='+data_id+']').parent().clone();
                            obj.mouseover(function(){
                                $(this).css({
                                    border: '2px solid blue'
                                });
                            }).mouseout(function(){
                                $(this).css({
                                    border: '1px solid black'
                                });
                            });
                            obj.draggable({
                                containment: '#test',
                                cursor: 'move',
                                grid: [ 10, 10 ],
                                snap: "#test,.div_table",
                                drag: function() {
                                    $(this).find($('.topline')).css('display', 'block');
                                    $(this).find($('.rightline')).css('display', 'block');
                                    $(this).find($('.botline')).css('display', 'block');
                                    $(this).find($('.leftline')).css('display', 'block');
                                },
                                start: function() {
                                    $(this).find($('.topline')).css('display', 'block');
                                    $(this).find($('.rightline')).css('display', 'block');
                                    $(this).find($('.botline')).css('display', 'block');
                                    $(this).find($('.leftline')).css('display', 'block');
                                },
                                stop: function() {
                                    $(this).find($('.topline')).css('display', 'none');
                                    $(this).find($('.rightline')).css('display', 'none');
                                    $(this).find($('.botline')).css('display', 'none');
                                    $(this).find($('.leftline')).css('display', 'none');
                                }
                            });
                            obj.css({
                                top: Math.round(childOffset.top/10) * 10,
                                left: Math.round(childOffset.left/10)*10,
                            }).appendTo($("#test"));
                            idSeat();
                            absoluteDrag();
                        }
                    })
                }
            }
        },
        items: {
            "paste": {name: 'Paste',icon:"paste"}
        }
    })

    $.contextMenu({
        selector: '.context-menu-one',       
        callback: function(key, options) {
            if(key == 'edit'){
                var col = $(this).attr('data-col');
                var row = $(this).attr('data-row');
                $("#number_col").val(col);
                $("#number_row").val(row);
                $(".grid-chooser").val(col +' x '+row);
                var $allSquares = $('.square');
                $allSquares.removeClass('highlight');
                $('.roW:nth-child(-n+'+col+') .square:nth-child(-n+'+row+')').addClass('highlight');
                $("#seat_add").addClass('d-none');
                $("#seat_update").attr('data-id',$(this).attr('data-id')).removeClass('d-none');

            }
            if(key == 'delete'){
                $(this).parent().remove();
                idSeat();
            }
            if(key =='copy'){
                var type = $(this).attr('data-type');
                var data_id = $(this).attr('data-id');
                $("#test").attr({
                    'data-type':type,
                    'data-id': data_id,
                });
            }
        },
        items: {
            "edit": {name: 'Edit',icon: "edit"},
            "copy": {name: 'Copy', icon: "copy"},
            "delete": {name: 'Delete', icon: "delete"},
        }
    }); 

    $.contextMenu({
        selector: '.context-menu-two',        
        callback: function(key, options) {
            if(key == 'delete'){
                $(this).remove();
            }
            if(key == 'copy'){
                var type = $(this).attr('data-type');
                var data_id = $(this).index();
                $("#test").attr({
                    'data-type':type,
                    'data-id': data_id,
                });
            }
        },
        items: {
            "delete": {name: 'Delete',icon: "delete"},
            'copy':{name: 'Copy',icon:"copy"},
            'edit': {
                name: "Text",
                type: 'text', 
                value: ""
            },
            sep1: "---------",
            key: {
                name: "Change text", 
                callback: function(){
                    $(".context-menu-list").each(function () {
                        if ($(this).css("display") !== "none") { 
                            var txt = $(this).children(".context-menu-input").children().children().eq(1).val();
                            $("#test").attr('data-text',txt);
                        }
                    })
                    $(this).children('b').text($("#test").attr('data-text'));
                    $("#test").attr('');
                }
            }
        }
    }); 
    $.contextMenu({
        selector: '.right-click-door',
        
        callback: function(key, options) {
            if(key == 'delete'){
            $(this).remove();
            }
        },
        items: {
            "delete": {name: 'Delete',icon:"delete"}
        }
    }); 
        $("#seat_update").click(function(){
            var id = $(this).attr('data-id');
            $(this).attr('data-id','');
            var col = $("#number_col").val();
            var row = $("#number_row").val();
            if ( col === '' || row === '' || col == 0 || row == 0) {
                $.toast({
                    heading: 'Error',
                    text: 'Please input data for seat',
                    icon: 'error',
                    position: 'bottom-right',
                    loader: false
                });
            }else{
                var length = $("#test").find($("[data-type=seat]")).length;
                var childPos = $("table[data-id="+id+"]").offset();
                var next = $("table[data-id="+id+"]").parent().next();
                $("table[data-id="+id+"]").parent().remove();
                var seat = createTable(row, col,'update');
                seat.children('table').attr('data-id',id);
                seat.children('table').children().children().eq(0).text(id);
                var parentPos = $("#test").offset();
                var childOffset = {
                    top: childPos.top - parentPos.top - 1,
                    left: childPos.left - parentPos.left - 1
                }
                seat.css({
                    top: childOffset.top,
                    left: childOffset.left
                })
                if(id == length){
                    seat.appendTo($('#test'));
                }else{
                    next.before(seat);
                }
                absoluteDrag();
                $("#number_col").val('1');
                $("#number_row").val('1');
                $(".grid-chooser").val('1 x 1');
                var $allSquares = $('.square');
                $allSquares.removeClass('highlight');
                $('.roW:nth-child(-n+'+1+') .square:nth-child(-n+'+1+')').addClass('highlight');
                $(this).addClass('d-none');
                $("#seat_add").removeClass('d-none');
            }
        });
        $("#obj_add").click(function(){
            var obj = createObj();
            obj.appendTo($("#test"));
            absoluteDrag();
        });
        $("#seat_add").click(function(){
            var col = $("#number_col").val();
            var row = $("#number_row").val();
            if (col === '' || row === '' || col == 0 || row == 0) {
                $.toast({
                    heading: 'Error',
                    text: 'Please input data for seat',
                    icon: 'error',
                    position: 'bottom-right',
                    loader: false
                });
            }else{
                var seat = createTable(row,col);
                seat.appendTo($("#test"));
                absoluteDrag();
                $("#number_col").val('1');
                $("#number_row").val('1');
                $(".grid-chooser").val('1 x 1');
                var $allSquares = $('.square');
                $allSquares.removeClass('highlight');
                $('.roW:nth-child(-n+'+1+') .square:nth-child(-n+'+1+')').addClass('highlight');
            }
        });
        $("#door_add").click(function(){
            var str = $("#door_input").val()
            createDoor($('#test'),str);
        });
        $('[data-toggle="tooltip"]').tooltip();
});

function createTable(row,col,type){
    var x = 60;
    var temp = 0;
    var div = $("<div>").addClass('div_table').css({
        height: 'auto',
        width: 'auto',
        border: '1px solid black'                                                                                                                                                                                                    
    });//dung o day
    div.mouseover(function(){
        $(this).css({
            border: '2px solid blue'
        });
    }).mouseout(function(){
        $(this).css({
            border: '1px solid black'
        });
    });
    var span1 = $("<span>").addClass("topline").appendTo($(div));
    var span2 = $("<span>").addClass("rightline").appendTo($(div));
    var span3 = $("<span>").addClass("botline").appendTo($(div));
    var span4 = $("<span>").addClass("leftline").appendTo($(div));
    var table = $('<table>').addClass("context-menu-one").attr({
        'data-col': col,
        'data-row': row,
        'data-type': 'seat'
    }).appendTo($(div));
    for (m = 0; m< row; m++) {
        tr = $('<tr>').appendTo($(table));
        for (n = 0; n < col; n++) {
            td = $('<td>').css({
                height: x+'px',
                width: x+'px',
            }).appendTo($(tr));
            var div1 = $('<div>').css({
                width: '100%',
                height: '100%',
                //background: 'red',
            }).appendTo($(td));
            temp++;
        }
    }
    table.css({
        height: row * x +'px',
        width: col * x +'px',
    });
    div.draggable({
        containment: '#test',
        cursor: 'move',
        grid: [ 10, 10 ],
        snap: "#test,.div_table",
        drag: function() {
            $(this).find($('.topline')).css('display', 'block');
            $(this).find($('.rightline')).css('display', 'block');
            $(this).find($('.botline')).css('display', 'block');
            $(this).find($('.leftline')).css('display', 'block');
        },
        start: function() {
            $(this).find($('.topline')).css('display', 'block');
            $(this).find($('.rightline')).css('display', 'block');
            $(this).find($('.botline')).css('display', 'block');
            $(this).find($('.leftline')).css('display', 'block');
        },
        stop: function() {
            $(this).find($('.topline')).css('display', 'none');
            $(this).find($('.rightline')).css('display', 'none');
            $(this).find($('.botline')).css('display', 'none');
            $(this).find($('.leftline')).css('display', 'none');
        }
    });
    if(type != 'update'){
        var id = idSeat();
        table.attr('data-id',id);
        table.children().children().eq(0).text(id);
    }
    return div;
}

function createObj(){
    var div1 = $("<div>").css({
        'width': '60px',
        'height': '60px',
        'text-align': 'center',
        display: 'flex',
        border: '2px solid black'
    }).attr('data-type','obj').addClass('context-menu-two div_table');
    var span1 = $("<span>").addClass("topline").appendTo($(div1));
    var span2 = $("<span>").addClass("rightline").appendTo($(div1));
    var span3 = $("<span>").addClass("botline").appendTo($(div1));
    var span4 = $("<span>").addClass("leftline").appendTo($(div1));
    var div2 = $("<b>").css({
        margin: '0 auto',
        'align-self': 'center'
    }).appendTo($(div1));
    div1.mouseover(function(){
        $(this).css({
            border: '2px solid blue'
        });
    }).mouseout(function(){
        $(this).css({
            border: '1px solid black'
        });
    });
    div1.draggable({
        containment: '#test',
        cursor: 'move',
        snap: "#test,.div_table",
        grid: [ 10, 10 ],
        drag: function() {
            $(this).find($('.topline')).css('display', 'block');
            $(this).find($('.rightline')).css('display', 'block');
            $(this).find($('.botline')).css('display', 'block');
            $(this).find($('.leftline')).css('display', 'block');
        },
        start: function() {
            $(this).find($('.topline')).css('display', 'block');
            $(this).find($('.rightline')).css('display', 'block');
            $(this).find($('.botline')).css('display', 'block');
            $(this).find($('.leftline')).css('display', 'block');
        },
        stop: function() {
            $(this).find($('.topline')).css('display', 'none');
            $(this).find($('.rightline')).css('display', 'none');
            $(this).find($('.botline')).css('display', 'none');
            $(this).find($('.leftline')).css('display', 'none');
        }
    }).resizable();
    return div1;
}

function createDoor(div, e){
    var x = 50;
    var r, top, bottom, right, left, t_o, axis;
    if(e=='l'){
        r = 90;
        left = '0';
        t_o = '25% 50%';
        axis = 'y';
    }
    if(e=='t'){
        r = 180;
        top = '0';
        axis = 'x';
    }
    if(e=='r'){
        r = -90;
        right = '0';
        t_o ='50% 0%';
        axis = 'y';
    }
    if(e=='b'){
        bottom = '0';
        axis = 'x';
    }
    var div1 = $("<div>").css({
        height: '30px',
        width: '60px',
        position: 'absolute',
        transform: 'rotate('+r+'deg)',
        'transform-origin': t_o,
        top: top,
        left: left,
        bottom: bottom,
        right: right
    }).addClass('right-click-door').appendTo($(div));
    var door = $("<div>").css({
        height: '30px',
        width: '30px',
        border: '1px solid black',
        'border-radius': '0 65px 0 0',
        float: 'left'
    }).appendTo($(div1));
    var door1 = $("<div>").css({
        height: '30px',
        width: '30px',
        border: '1px solid black',
        'border-radius': '65px 0 0 0',
        float: 'left'
    }).appendTo($(div1));
    div1.draggable({
        containment: '#test',
        cursor: 'move',
        snap: "#test,.div_table",
        axis: axis
    });
}
function confirmBack() {
    var r = confirm("Are you sure you want to clear the input information?");
    if (r == true) {
        window.location.replace("/admin/seats");
    }
}
function absoluteDrag(){
    $('.div_table').each(function() {
        var top = $(this).position().top + 'px';
        var left = $(this).position().left + 'px';
        $(this).css({top: top, left: left});
    }).css({position: 'absolute'});
}
function idSeat(){
    var length = $("#test").find($("[data-type=seat]")).length;
    if(length){
        $('table[data-type=seat]').each(function(index, value){
            $(this).attr('data-id',index+1);
            $(this).children().children().eq(0).text(index+1);
        })
        return length+1;
    }else{
        return 1;
    }
}