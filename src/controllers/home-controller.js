class HomeController {

    async index(req, res) {
        const { user } = req.session;
        const list = [
            {
                id: 1,
                title: "Titulo",
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis sem sit amet nulla porttitor tempor nec non dui. Sed a lobortis justo, et placerat leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt lorem non ornare accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at ultrices sem. Pellentesque imperdiet nulla consequat, tincidunt tortor et, vulputate sapien. Donec venenatis tempus nunc et fringilla.`,
                img: 'img'
            },
            {
                id: 2,
                title: "Titulo",
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis sem sit amet nulla porttitor tempor nec non dui. Sed a lobortis justo, et placerat leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt lorem non ornare accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at ultrices sem. Pellentesque imperdiet nulla consequat, tincidunt tortor et, vulputate sapien. Donec venenatis tempus nunc et fringilla.`,
                img: 'img'
            }
        ]
        return res.render('index', {list: list, user: user});
    }

    async single(req, res) {
        const { user } = req.session;
        const post = {
            title: "Titulo",
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis sem sit amet nulla porttitor tempor nec non dui. Sed a lobortis justo, et placerat leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt lorem non ornare accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at ultrices sem. Pellentesque imperdiet nulla consequat, tincidunt tortor et, vulputate sapien. Donec venenatis tempus nunc et fringilla.`,
            img: 'img'
        }
        return res.render('single', {post: post, user: user});
    }

}

module.exports = HomeController;