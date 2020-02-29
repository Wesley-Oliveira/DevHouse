// metodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: criar uma sessão
show: listagem de uma única sessão
update: atualizar sessão
destroy: deletar uma sessao
*/
import User from '../models/User';
import * as Yup from 'yup';

class SessionCOntroller{
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        const { email } = req.body;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        //Verificando se o usuário existe
        let user = await User.findOne({ email });
        
        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

export default new SessionCOntroller();